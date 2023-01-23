import { Block } from '$core/Block';
import { ChatHeader } from '../ChatHeader';
import { MessagesList } from '../MessagesList';
import { MessageInputForm } from '../MessageInputForm';

export class CurrentChatScreen extends Block {
  constructor() {
    const chatHeader = new ChatHeader();
    const messageInputForm = new MessageInputForm();
    const messagesList = new MessagesList();

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
