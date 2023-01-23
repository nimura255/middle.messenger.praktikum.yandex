import { chatsController } from '$controllers/chats';
import { Block, makeChildrenFromList } from '$core/Block';
import { UserRow } from './UserRow';
import type { UserRowProps } from './types';
import './styles.pcss';

export class DeleteUserModalContent extends Block {
  constructor() {
    super({}, {});
  }

  renderUsersList = (items: UserRowProps[]) => {
    const blocks = items.map((params) => new UserRow(params));
    const { template, children } = makeChildrenFromList(blocks);

    this.setProps({
      listTemplate: template,
      children,
    });
  };

  async componentDidMount() {
    const searchResults = await chatsController.searchCurrentChatUsers();

    if (!searchResults?.length) {
      return;
    }

    const listItems = searchResults?.map((result, index) => {
      const { id, first_name, display_name, second_name, avatar } = result;

      return {
        id,
        avatar,
        name: display_name || `${first_name} ${second_name}`,
        onDelete: () => {
          listItems.splice(index, 1);
          this.renderUsersList(listItems);
        },
      };
    });

    this.renderUsersList(listItems);
  }

  render() {
    return `
      <div class="mfm-modal-content mfm-delete-user-modal">
        <h1 class="mfm-typography__text_l mfm-modal-content__title">
          Delete user
        </h1>

        <div class="mfm-delete-user-modal__rows-list">
          ${this.props.listTemplate || ''}
        </div>
      </div>
    `;
  }
}
