import { ButtonWithChevron } from '$components/ButtonWithChevron';
import { chatsController } from '$controllers/chats';
import { Block, makeChildrenFromList } from '$core/Block';
import { store, type ChatInfo, type StoreState } from '$store';
import { ChatsListItem } from '../ChatsListItem';

export class ChatsList extends Block {
  chats: ChatInfo[] = [];
  listPageSize = 10;
  scrollPosition = 0;

  constructor() {
    const loadFurtherButton = new ButtonWithChevron({
      text: 'load further',
      direction: 'down',
    });

    const handleScrollChange = (event: Event) => {
      const target = event.target as HTMLElement;

      this.scrollPosition = target.scrollTop;
    };

    super(
      {
        hasReachedEnd: false,
        chatsTemplate: '',
        children: { loadFurtherButton },
        events: {
          scroll: handleScrollChange,
        },
      },
      {}
    );

    loadFurtherButton.setProp('events', {
      click: this.loadFurtherChats,
    });
  }

  renderChatsList(chatsList: ChatInfo[]) {
    const blocks = chatsList.map((params) => {
      return new ChatsListItem(params);
    });
    const { template, children } = makeChildrenFromList(blocks);

    this.setProps({
      ...this.props,
      chatsTemplate: template,
      children: {
        ...this.children,
        ...children,
      },
    });
  }

  connectToStore = (storeState: Partial<StoreState>) => {
    const { chats } = storeState;

    if (chats && chats !== this.chats) {
      this.chats = chats;
      this.renderChatsList(chats);
    }
  };

  loadChats = async (offset: number) => {
    const { isEndOfList } = await chatsController.getChats({
      offset,
      limit: this.listPageSize,
    });

    if (isEndOfList) {
      this.setProp('hasReachedEnd', isEndOfList);
    }
  };

  loadInitChats = async () => {
    return this.loadChats(0);
  };

  loadFurtherChats = async () => {
    return this.loadChats(this.chats.length);
  };

  async componentDidMount() {
    if (!store.getState()?.chats) {
      await this.loadInitChats();
    }

    store.subscribeWithImmediateCall(this.connectToStore);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectToStore);
  }

  componentDidUpdate() {
    this.element?.scrollTo(0, this.scrollPosition);
  }

  render() {
    return `
      <div class="mfm-chats-list-column__chats-list">
        ${this.props.chatsTemplate}
        {{#if hasReachedEnd}}
        {{else}}
          <div class="mfm-chats-list-column__chats-list__load-further-button-wrapper">
            {{{loadFurtherButton}}}
          </div>
        {{/if}}
      </div>
    `;
  }
}
