import { chatStore, type ChatStoreState } from '$store';
import { urlJoin } from '$utils/url';
import {
  type ConnectToCurrentChatParams,
  type MessageEventListener,
  type SendMessageParams,
  type SocketChatMessage,
  type SocketMessage,
  SocketMessageType,
} from './types';

export class ChatSocket {
  private socket: WebSocket | undefined;
  private messagesListenersSet = new Set<MessageEventListener>();
  private chatUsersMap = new Map<number, string>();
  private memoizedUsers: ChatStoreState['users'] | undefined;

  connectToCurrentChat = (params: ConnectToCurrentChatParams) => {
    const { chatId, token, userId } = params;

    const rootUrl = process.env.WS_ROOT || '';
    const url = urlJoin(rootUrl, `${userId}/${chatId}/${token}`);
    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', () => {
      chatStore.subscribeWithImmediateCall(this.handleChatUserListChange);
    });
    this.socket.addEventListener('close', () => {
      this.handleSocketClose();
      chatStore.unsubscribe(this.handleChatUserListChange);
      chatStore.reset();
    });

    const listenToMessages = (event: MessageEvent<string>) => {
      const parsedData = JSON.parse(event.data) as SocketMessage;
      this.processSocketMessage(parsedData);
    };

    this.subscribeToMessages(listenToMessages);
  };

  disconnectFromChat = () => {
    this.socket?.close();
  };

  sendMessage = (params: SendMessageParams) => {
    this.socket?.send(
      JSON.stringify({
        type: SocketMessageType.Message,
        content: params.text,
      })
    );
  };

  private subscribeToMessages = (callback: MessageEventListener) => {
    if (!this.socket) {
      return;
    }

    this.socket.addEventListener('message', callback);
    this.messagesListenersSet.add(callback);
  };

  private unsubscribeFromMessages = (callback: MessageEventListener) => {
    if (!this.socket) {
      return;
    }

    this.socket.removeEventListener('message', callback);
    this.messagesListenersSet.delete(callback);
  };

  private handleSocketClose = () => {
    this.messagesListenersSet.forEach(this.unsubscribeFromMessages);
  };

  private handleChatUserListChange = (storeState: ChatStoreState) => {
    const { users } = storeState;

    if (users === this.memoizedUsers) {
      return;
    }

    this.memoizedUsers = users;
    this.chatUsersMap = new Map(
      users.map((userData) => {
        const { id, first_name, second_name, display_name } = userData;

        return [id, display_name || `${first_name} ${second_name}`];
      })
    );
  };

  private processSocketMessage = (message: SocketMessage) => {
    if (message.type === SocketMessageType.Message) {
      const { id, time, user_id, content } = message as SocketChatMessage;
      const { messages } = chatStore.getState();
      const authorName = this.chatUsersMap.get(user_id);

      chatStore.setByKey('messages', [
        ...messages,
        {
          id,
          time,
          text: content,
          user_id,
          authorName,
        },
      ]);

      return;
    }
  };
}
