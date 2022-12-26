import { Block } from '$core/Block';
import { ChatHeader } from './ChatHeader';
import { ChatsListColumn } from './ChatsListColumn';
import { MessageInputForm } from './MessageInputForm';
import { MessagesList } from './MessagesList';
import './styles.pcss';

export class ChatPage extends Block {
  constructor() {
    const chatHeader = new ChatHeader();
    const chatsListColumn = new ChatsListColumn();
    const messageInputForm = new MessageInputForm();
    const messagesList = new MessagesList();

    const propsWithChildren = {
      children: {
        chatHeader,
        chatsListColumn,
        messageInputForm,
        messagesList,
      },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      <div class="mfm-chat-page__layout">
        {{{chatsListColumn}}}
        <main class="mfm-chat-page__chat-column">
          {{{chatHeader}}}
          {{{messagesList}}}
          {{{messageInputForm}}}
        </main>
      </div>
    `;
  }
}
