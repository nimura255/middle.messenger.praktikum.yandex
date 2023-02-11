import { wsRoot } from '$constants/apiRoots';
import { chatsController } from '$controllers/chats';
import { chatStore, type ChatStoreState } from '$store/chatStore';
import { urlJoin } from '$utils/url';
import { messagesListPageSize, pingInterval } from './constants';
import {
  type ConnectToCurrentChatParams,
  type MessageEventListener,
  type SendMessageParams,
  type SocketChatMessage,
  type SocketChatOldMessage,
  type SocketMessage,
  SocketMessageType,
} from './types';
import { adaptMessageForStore } from '$controllers/webSocket/utils';

export class ChatSocket {
  private socket: WebSocket | undefined;
  private messagesListenersSet = new Set<MessageEventListener>();
  private chatUsersMap = new Map<number, string>();
  private memoizedUsers: ChatStoreState['users'] | undefined;
  private pingIntervalId: number | undefined;

  connectToCurrentChat = (params: ConnectToCurrentChatParams) => {
    const { chatId, token, userId } = params;

    const url = urlJoin(wsRoot, `${userId}/${chatId}/${token}`);
    this.socket = new WebSocket(url);

    this.socket.addEventListener('open', () => {
      chatStore.subscribeWithImmediateCall(this.handleChatUserListChange);
      this.requestPrevMessages();
      this.pingIntervalId = window.setInterval(this.ping, pingInterval);
    });
    this.socket.addEventListener('close', () => {
      this.handleSocketClose();
      chatStore.unsubscribe(this.handleChatUserListChange);
      window.clearInterval(this.pingIntervalId);
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

  requestPrevMessages = () => {
    const { hasLoadedAllOldMessages, messages } = chatStore.getState();
    const offset = messages.length;

    if (hasLoadedAllOldMessages) {
      return;
    }

    this.socket?.send(
      JSON.stringify({
        type: SocketMessageType.GetOld,
        content: offset,
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

  private processSocketMessage = (
    message: SocketMessage | SocketMessage[]
  ) => {
    if (Array.isArray(message)) {
      const oldMessages = message as SocketChatOldMessage[];
      const { messages: storedMessages, users } = chatStore.getState();

      const adaptedOldMessages = oldMessages.map((rawData) => {
        const authorName = this.chatUsersMap.get(rawData.user_id);

        return adaptMessageForStore(rawData, authorName);
      });
      const hasLoadedAllOldMessages =
        oldMessages.length < messagesListPageSize;

      chatStore.set({
        hasLoadedAllOldMessages,
        users,
        messages: [...storedMessages, ...adaptedOldMessages],
      });

      return;
    }

    if (message.type === SocketMessageType.Message) {
      const { user_id } = message as SocketChatMessage;
      const { messages } = chatStore.getState();
      const authorName = this.chatUsersMap.get(user_id);
      const adaptedMessage = adaptMessageForStore(
        message as SocketChatMessage,
        authorName
      );

      chatStore.setByKey('messages', [adaptedMessage, ...messages]);
      chatsController.updateCurrentChatLastMessage({
        lastMessageUserId: user_id,
        lastMessage: adaptedMessage.text,
        lastMessageTime: adaptedMessage.time,
      });

      return;
    }
  };

  private ping = () => {
    this.socket?.send(
      JSON.stringify({
        type: 'ping',
      })
    );
  };
}
