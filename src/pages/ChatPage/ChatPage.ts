import { Block } from '$core/Block';
import { store, type StoreState } from '$store';
import { ChatsListColumn } from './ChatsListColumn';
import { ChatColumnPlaceholder } from './ChatColumnPlaceholder';
import { CurrentChatScreen } from './CurrentChatScreen';
import './styles.pcss';

export class ChatPage extends Block {
  currentChatId?: number;
  chatsListColumn: ChatsListColumn;

  constructor() {
    const chatsListColumn = new ChatsListColumn();

    const propsWithChildren = {
      children: { chatsListColumn },
    };

    super(propsWithChildren, {});

    this.chatsListColumn = chatsListColumn;
  }

  connectToStore = (storeState: Partial<StoreState>) => {
    const { currentChatId } = storeState;

    if (currentChatId === undefined) {
      const chatScreen = new ChatColumnPlaceholder();

      this.setProp('children', {
        ...this.children,
        chatScreen,
      });
    } else if (currentChatId !== this.currentChatId) {
      const chatScreen = new CurrentChatScreen();

      this.setProp('children', {
        ...this.children,
        chatScreen,
      });
    }

    this.currentChatId = currentChatId;
  };

  componentDidMount() {
    store.subscribeWithImmediateCall(this.connectToStore);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectToStore);
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
