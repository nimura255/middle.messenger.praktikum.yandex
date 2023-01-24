import { ChatSocket } from '$controllers/webSocket';
import { Block } from '$core/Block';
import { store } from '$store';
import { ChatHeader } from '../ChatHeader';
import { MessagesList } from '../MessagesList';
import {
  MessageInputForm,
  type MessageInputFormProps,
} from '../MessageInputForm';

export class CurrentChatScreen extends Block {
  chatSocket: ChatSocket | undefined;
  messageInputForm: MessageInputForm;
  messagesList: MessagesList;

  constructor() {
    const chatHeader = new ChatHeader();
    const messageInputForm = new MessageInputForm({});
    const messagesList = new MessagesList({});

    super(
      {
        children: {
          chatHeader,
          messageInputForm,
          messagesList,
        },
      },
      {}
    );

    this.messageInputForm = messageInputForm;
    this.messagesList = messagesList;
  }

  componentDidMount() {
    const { currentChatId, user, currentChatToken } = store.getState();
    const usedId = user?.id;

    if (!(currentChatId && usedId && currentChatToken)) {
      return;
    }

    const chatSocket = new ChatSocket();
    chatSocket.connectToCurrentChat({
      chatId: currentChatId,
      userId: usedId,
      token: currentChatToken,
    });
    this.chatSocket = chatSocket;

    const onMessageSubmit: MessageInputFormProps['onSubmit'] = (data) => {
      chatSocket.sendMessage({
        text: data.text,
      });
    };
    const onLoadPrev = () => chatSocket.requestPrevMessages();

    this.messageInputForm.setProp('onSubmit', onMessageSubmit);
    this.messagesList.setProp('onLoadPrev', onLoadPrev);
  }

  componentWillUnmount() {
    if (this.chatSocket) {
      this.chatSocket.disconnectFromChat();
    }
  }

  render() {
    return `
      <main class="mfm-chat-page__chat-column">
        {{{chatHeader}}}
        {{{messagesList}}}
        {{{messageInputForm}}}
      </main>
    `;
  }
}
