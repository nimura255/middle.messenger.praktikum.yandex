import { Block } from '$core/Block';
import { Modal } from '$components/Modal';
import {
  TooltipMenu,
  type TooltipMenuProps,
} from '$components/TooltipMenu';
import {
  circledCrossIcon,
  circledPlusIcon,
  leaveIcon,
  garbageIcon,
} from '$iconsTemplates';
import { selectCurrentChat, store, type StoreState } from '$store';
import { AddUserModalContent } from '../AddUserModalContent';
import { DeleteUserModalContent } from '../DeleteUserModalContent';
import { DeleteChatModalContent } from '../DeleteChatModalContent';
import { LeaveChatModalContent } from '../LeaveChatModalContent';

type MenuPermissions = {
  addUser: boolean;
  deleteUser: boolean;
  leaveChat: boolean;
  deleteChat: boolean;
};

export class DotsTooltipContent extends Block {
  constructor() {
    super({ isAddUserModalVisible: false }, {});
  }

  createTooltipMenu = (permissions: MenuPermissions) => {
    const addUserModal = new Modal({
      isActive: false,
      slot: AddUserModalContent,
      slotProps: {
        onClose: () => addUserModal.setProp('isActive', false),
      },
    });
    const deleteUserModal = new Modal({
      isActive: false,
      slot: DeleteUserModalContent,
    });
    const deleteChatModal = new Modal({
      isActive: false,
      slot: DeleteChatModalContent,
      slotProps: {
        onClose: () => deleteChatModal.setProp('isActive', false),
      },
    });
    const leaveChatModal = new Modal({
      isActive: false,
      slot: LeaveChatModalContent,
      slotProps: {
        onClose: () => leaveChatModal.setProp('isActive', false),
      },
    });

    const menuItems = [
      permissions.addUser && {
        name: 'Add user',
        iconTemplate: circledPlusIcon,
        events: {
          click: () => addUserModal.setProp('isActive', true),
        },
      },
      permissions.deleteUser && {
        name: 'Delete user',
        iconTemplate: circledCrossIcon,
        events: {
          click: () => deleteUserModal.setProp('isActive', true),
        },
      },
      permissions.leaveChat && {
        name: 'Leave chat',
        iconTemplate: leaveIcon,
        events: {
          click: () => leaveChatModal.setProp('isActive', true),
        },
      },
      permissions.deleteChat && {
        name: 'Delete chat',
        iconTemplate: garbageIcon,
        events: {
          click: () => deleteChatModal.setProp('isActive', true),
        },
      },
    ].filter(Boolean) as TooltipMenuProps['items'];

    const menu = new TooltipMenu({ items: menuItems });
    this.setProp('children', { menu });
  };

  connectToStore = (storeState: Partial<StoreState>) => {
    const currentChat = selectCurrentChat(storeState);
    const isCreatorOfChat =
      !!currentChat && storeState.user?.id === currentChat?.creatorId;

    this.createTooltipMenu({
      addUser: true,
      deleteUser: isCreatorOfChat,
      leaveChat: true,
      deleteChat: isCreatorOfChat,
    });
  };

  componentDidMount() {
    store.subscribeWithImmediateCall(this.connectToStore);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectToStore);
  }

  render() {
    return `
      {{{menu}}}
      {{{addUserModal}}}
    `;
  }
}
