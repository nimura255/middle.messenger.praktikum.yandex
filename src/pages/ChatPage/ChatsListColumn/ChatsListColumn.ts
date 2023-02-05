import { ButtonWithChevron } from '$components/ButtonWithChevron';
import { IconButton } from '$components/IconButton';
import { Modal } from '$components/Modal';
import { SearchInput } from '$components/SearchInput';
import { routes } from '$constants/routes';
import { Block } from '$core/Block';
import { Link } from '$core/router';
import { newMessageIcon } from '$iconsTemplates';
import { NewChatModalContent } from './NewChatModalContent';
import { ChatsList } from './ChatsList';
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
    const chatsList = new ChatsList();

    super(
      {
        children: {
          profileLink,
          searchInput,
          newChatButton,
          chatsList,
        },
      },
      {}
    );
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
        {{{chatsList}}}
      </div>
    `;
  }
}
