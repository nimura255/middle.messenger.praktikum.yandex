import { ButtonWithChevron } from '$components/ButtonWithChevron';
import { IconButton } from '$components/IconButton';
import { Modal } from '$components/Modal';
import { SearchInput } from '$components/SearchInput';
import { routes } from '$constants/routes';
import { Block, makeChildrenFromList } from '$core/Block';
import { Link } from '$core/router';
import { newMessageIcon } from '$iconsTemplates';
import { store, type ChatInfo, type StoreState } from '$store';
import { ChatsListItem } from '../ChatsListItem';
import { NewChatModalContent } from './NewChatModalContent';
import './styles.pcss';
import { chatsController } from '$controllers/chats';

export class ChatsListColumn extends Block {
  chats: ChatInfo[] = [];

  constructor() {
    const profileButton = new ButtonWithChevron({
      text: 'Profile',
    });
    const profileLink = new Link({
      path: routes.settings,
      children: { slot: profileButton },
    });
    const newChatModal = new Modal({
      isActive: false,
      slot: NewChatModalContent,
      slotProps: {
        onClose: () => newChatModal.setProp('isActive', false),
      },
    });
    const newChatButton = new IconButton({
      iconTemplate: newMessageIcon,
      shape: 'square',
      color: 'var(--mfm-color-blue)',
      full: false,
      size: '30px',
      events: {
        click: () => newChatModal.setProp('isActive', true),
      },
    });
    const searchInput = new SearchInput({
      placeholder: 'Search',
    });

    const propsWithChildren = {
      chatsTemplate: '',
      children: {
        profileLink,
        searchInput,
        newChatButton,
      },
    };

    super(propsWithChildren, {});
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

  loadInitChats = async () => {
    await chatsController.getChats({
      offset: 0,
      limit: 10,
    });
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

  render(): string {
    return `
      <div class="mfm-chats-list-column">
        <div class="mfm-chats-list-column__header">
          {{{profileLink}}}
        </div>
        <div class="mfm-chats-list-column__search-wrapper">
          {{{searchInput}}}
          {{{newChatButton}}}
        </div>
        <div class="mfm-chats-list-column__chats-list">
          ${this.props.chatsTemplate}
        </div>
      </div>
    `;
  }
}
