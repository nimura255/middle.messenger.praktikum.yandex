import { ButtonWithChevron } from '$components/ButtonWithChevron';
import { IconButton } from '$components/IconButton';
import { Modal } from '$components/Modal';
import { SearchInput } from '$components/SearchInput';
import { routes } from '$constants/routes';
import { Block, makeChildrenFromList } from '$core/Block';
import { Link } from '$core/router';
import { newMessageIcon } from '$iconsTemplates';
import { ChatsListItem } from '../ChatsListItem';
import { mockChatsList } from './constants';
import { NewChatModalContent } from './NewChatModalContent';
import './styles.pcss';

export class ChatsListColumn extends Block {
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

    const chats = mockChatsList.map((params) => new ChatsListItem(params));

    const { children: chatsChildren, template: chatsTemplate } =
      makeChildrenFromList(chats);

    const propsWithChildren = {
      children: {
        ...chatsChildren,
        profileLink,
        searchInput,
        newChatButton,
      },
    };

    super(propsWithChildren, {});

    this.setState({ chatsTemplate });
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
          ${this.state.chatsTemplate}
        </div>
      </div>
    `;
  }
}
