import { Block, makeChildrenFromList } from '$core/Block';
import { chatStore, type ChatStoreState } from '$store';
import { UserRow } from './UserRow';
import './styles.pcss';

export class DeleteUserModalContent extends Block {
  users: ChatStoreState['users'] | undefined;

  constructor() {
    super({}, {});
  }

  renderUsersList = (items: ChatStoreState['users']) => {
    const blocks = items.map((params) => {
      const { id, avatar, display_name, first_name, second_name } = params;

      return new UserRow({
        id: id,
        avatar: avatar,
        name: display_name || `${first_name} ${second_name}`,
      });
    });
    const { template, children } = makeChildrenFromList(blocks);

    this.setProps({
      listTemplate: template,
      children,
    });
  };

  connectToChatStore = (storeState: ChatStoreState) => {
    const { users } = storeState;

    if (users === this.users) {
      return;
    }

    this.users = users;
    this.renderUsersList(users);
  };

  componentDidMount() {
    chatStore.subscribeWithImmediateCall(this.connectToChatStore);
  }

  componentWillUnmount() {
    chatStore.unsubscribe(this.connectToChatStore);
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
