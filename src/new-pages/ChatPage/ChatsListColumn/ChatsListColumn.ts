import { Block } from '$core/Block';
import { makeChildrenFromList } from '$core/makeChildrenFromList';
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
    const searchInput = new SearchInput({
      placeholder: 'Search',
    });

    const chats = mockChatsList.map((params) => new ChatsListItem(params));

    const { children: chatsChildren, template: chatsTemplate } =
      makeChildrenFromList(chats);

    const propsWithChildren = {
      children: {
        ...chatsChildren,
        profileButton,
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
          {{{profileButton}}}
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
