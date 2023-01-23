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
import { selectCurrentChat, store } from '$store';
import { AddUserModalContent } from '../AddUserModalContent';
import { DeleteUserModalContent } from '../DeleteUserModalContent';
import { DeleteChatModalContent } from '../DeleteChatModalContent';
import { LeaveChatModalContent } from '../LeaveChatModalContent';

export class DotsTooltipContent extends Block {
  constructor() {
    const storeState = store.getState();
    const currentChat = selectCurrentChat(storeState);
    const isCreatorOfChat =
      !!currentChat && storeState.user?.id === currentChat?.creatorId;

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
      {
        name: 'Add user',
        iconTemplate: circledPlusIcon,
        events: {
          click: () => addUserModal.setProp('isActive', true),
        },
      },
      isCreatorOfChat && {
        name: 'Delete user',
        iconTemplate: circledCrossIcon,
        events: {
          click: () => deleteUserModal.setProp('isActive', true),
        },
      },
      {
        name: 'Leave chat',
        iconTemplate: leaveIcon,
        events: {
          click: () => leaveChatModal.setProp('isActive', true),
        },
      },
      isCreatorOfChat && {
        name: 'Delete chat',
        iconTemplate: garbageIcon,
        events: {
          click: () => deleteChatModal.setProp('isActive', true),
        },
      },
    ].filter(Boolean) as TooltipMenuProps['items'];

    const menu = new TooltipMenu({ items: menuItems });

    super(
      {
        isAddUserModalVisible: false,
        children: { menu },
      },
      {}
    );
  }

  render() {
    return `
      {{{menu}}}
      {{{addUserModal}}}
    `;
  }
}
