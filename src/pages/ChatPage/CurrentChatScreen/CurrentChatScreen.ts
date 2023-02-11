import { chatsController } from '$controllers/chats';
import { ChatSocket } from '$controllers/webSocket';
import { Block } from '$core/Block';
import { store, type StoreState } from '$store/appStore';
import { ChatHeader } from '../ChatHeader';
import { MessagesList } from '../MessagesList';
import {
  MessageInputForm,
  type MessageInputFormProps,
} from '../MessageInputForm';

export class CurrentChatScreen extends Block {
  chatSocket: ChatSocket | undefined;
  chatHeader: ChatHeader;
  messageInputForm: MessageInputForm;
  messagesList: MessagesList;

  constructor() {
    super({ children: {} }, {});

    this.chatHeader = new ChatHeader();
    this.messageInputForm = new MessageInputForm({});
    this.messagesList = new MessagesList({});

    this.messageInputForm.setProp('onSubmit', this.onMessageSubmit);
    this.messagesList.setProp('onLoadPrev', this.onLoadPrev);
  }

  onMessageSubmit: MessageInputFormProps['onSubmit'] = (data) => {
    this.chatSocket?.sendMessage({
      text: data.text,
    });
  };

  onLoadPrev = () => {
    return this.chatSocket?.requestPrevMessages();
  };

  displayChatScreen = (currentChatId: number) => {
    this.setProps({
      currentChatId,
      children: {
        chatHeader: this.chatHeader,
        messageInputForm: this.messageInputForm,
        messagesList: this.messagesList,
      },
    });
  };

  hideChatScreen = () => {
    this.setProps({
      currentChatId: undefined,
      children: {},
    });
  };

  connectToStore = (storeState: Partial<StoreState>) => {
    const { currentChatId, currentChatToken, user } = storeState;
    const usedId = user?.id;

    if (this.props.currentChatId === currentChatId) {
      return;
    }

    if (this.chatSocket) {
      this.chatSocket.disconnectFromChat();
    }

    if (currentChatId && usedId && currentChatToken) {
      this.chatSocket = new ChatSocket();
      this.chatSocket.connectToCurrentChat({
        chatId: currentChatId,
        userId: usedId,
        token: currentChatToken,
      });

      this.displayChatScreen(currentChatId);
      chatsController.updateCurrentChatNewMessagesCount({ count: 0 });
    } else {
      this.hideChatScreen();
    }
  };

  componentDidMount() {
    store.subscribeWithImmediateCall(this.connectToStore);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectToStore);

    if (this.chatSocket) {
      this.chatSocket.disconnectFromChat();
    }
  }

  render() {
    return `
      <main class="mfm-chat-page__chat-column">
        {{#if currentChatId}}
          {{{chatHeader}}}
          {{{messagesList}}}
          {{{messageInputForm}}}
        {{else}}
          <div class="mfm-chat-page__placeholder">
            <p class="mfm-typography__text_m">
              Select a chat to start messaging
            </p>
          </div>
        {{/if}}
      </main>
    `;
  }
}
