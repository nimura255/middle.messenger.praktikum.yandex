import { Avatar } from '$components/Avatar';
import { IconButton } from '$components/IconButton';
import { appController } from '$controllers/app';
import { chatsController } from '$controllers/chats';
import { Block } from '$core/Block';
import { circledCrossIcon } from '$iconsTemplates';
import type { UserRowProps } from './types';

export class UserRow extends Block {
  constructor(props: UserRowProps) {
    const deleteUser = async () => {
      appController.setLoadingSpinnerStatus(true);
      await chatsController.deleteUserFromChat({ userId: props.id });
      appController.setLoadingSpinnerStatus(false);
    };

    const avatar = new Avatar({ src: props.avatar || '' });
    const deleteButton = new IconButton({
      iconTemplate: circledCrossIcon,
      full: true,
      shape: 'circle',
      events: { click: deleteUser },
    });

    super(
      {
        name: props.name,
        children: { avatar, deleteButton },
      },
      {}
    );
  }

  render() {
    return `
      <div class="mfm-delete-user-modal__user-row">
        {{{avatar}}}
        <p class="mfm-typography__text_l mfm-delete-user-modal__user-row__title">
          {{name}}
        </p>
        <div class="mfm-delete-user-modal__user-row__delete-button-wrapper">
          {{{deleteButton}}}
        </div>
      </div>
    `;
  }
}
