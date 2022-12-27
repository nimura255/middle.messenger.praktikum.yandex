import { Block } from '$core/Block';
import { Link } from '$core/router';
import { makeChildrenFromList } from '$core/Block';
import { ButtonWithChevron } from '$components/ButtonWithChevron';
import { ChatsListItem } from '../ChatsListItem';
import { SearchInput } from '$components/SearchInput';
import { mockChatsList } from './constants';
import './styles.pcss';

export class ChatsListColumn extends Block {
  constructor() {
    const profileButton = new ButtonWithChevron({
      text: 'Profile',
    });
    const profileLink = new Link({
      path: '/profile',
      children: { slot: profileButton },
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
        </div>
        <div class="mfm-chats-list-column__chats-list">
          ${this.state.chatsTemplate}
        </div>
      </div>
    `;
  }
}
