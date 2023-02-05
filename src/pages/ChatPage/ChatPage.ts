import { Block } from '$core/Block';
import { ChatsListColumn } from './ChatsListColumn';
import { CurrentChatScreen } from './CurrentChatScreen';
import './styles.pcss';

export class ChatPage extends Block {
  constructor() {
    const propsWithChildren = {
      children: {
        chatsListColumn: new ChatsListColumn(),
        chatScreen: new CurrentChatScreen(),
      },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      <div class="mfm-chat-page__layout">
        {{{chatsListColumn}}}
        {{{chatScreen}}}
      </div>
    `;
  }
}
