import { Block, makeChildrenFromList } from '$core/Block';
import { UserRow } from './UserRow';
import './styles.pcss';

export class DeleteUserModalContent extends Block {
  constructor() {
    super({}, {});
  }

  renderUsersList = (items: Array<{ name: string }>) => {
    const blocks = items.map((params) => new UserRow(params));
    const { template, children } = makeChildrenFromList(blocks);

    this.setProps({
      listTemplate: template,
      children,
    });
  };

  componentDidMount() {
    const listItems = [
      {
        name: 'user1',
      },
      {
        name: 'user2',
      },
      {
        name: 'user3',
      },
    ];

    this.renderUsersList(listItems);
  }

  render() {
    return `
      <div class="mfm-modal-content mfm-delete-user-modal">
        <h1 class="mfm-typography__text_l mfm-modal-content__title">
          Delete user
        </h1>

        <div class="mfm-delete-user-modal__rows-list">
          ${this.props.listTemplate}
        </div>
      </div>
    `;
  }
}
