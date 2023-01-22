import { Block } from '$core/Block';
import { Modal } from '$components/Modal';
import { TooltipMenu } from '$components/TooltipMenu';
import {
  circledCrossIcon,
  circledPlusIcon,
  leaveIcon,
} from '$iconsTemplates';
import { AddUserModalContent } from '../AddUserModalContent';
import { DeleteUserModalContent } from '../DeleteUserModalContent';
import { LeaveChatModalContent } from '../LeaveChatModalContent';

export class DotsTooltipContent extends Block {
  constructor() {
    const addUserModal = new Modal({
      isActive: false,
      slot: AddUserModalContent,
    });
    const deleteUserModal = new Modal({
      isActive: false,
      slot: DeleteUserModalContent,
    });
    const leaveChatModal = new Modal({
      isActive: false,
      slot: LeaveChatModalContent,
      slotProps: {
        onClose: () => leaveChatModal.setProp('isActive', false),
      },
    });

    const menu = new TooltipMenu({
      items: [
        {
          name: 'Add user',
          iconTemplate: circledPlusIcon,
          events: {
            click: () => addUserModal.setProp('isActive', true),
          },
        },
        {
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
      ],
    });

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
