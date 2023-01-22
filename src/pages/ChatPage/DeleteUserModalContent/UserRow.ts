import { Avatar } from '$components/Avatar';
import { IconButton } from '$components/IconButton';
import { Block } from '$core/Block';
import { circledCrossIcon } from '$iconsTemplates';
import type { UserRowProps } from './types';

export class UserRow extends Block {
  constructor(props: UserRowProps) {
    const avatar = new Avatar({ src: props.avatarSrc || '' });
    const deleteButton = new IconButton({
      iconTemplate: circledCrossIcon,
      full: true,
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
