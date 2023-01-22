import { Button } from '$components/Button';
import { Block } from '$core/Block';
import type { LeaveChatModalContentProps } from './types';

export class LeaveChatModalContent extends Block {
  constructor(props: LeaveChatModalContentProps) {
    const cancelButton = new Button({
      text: 'Cancel',
      variant: 'secondary',
      events: { click: props.onClose },
    });
    const submitButton = new Button({
      text: 'Yes',
      variant: 'primary',
    });

    super(
      {
        children: { cancelButton, submitButton },
      },
      {}
    );
  }

  render() {
    return `
      <div class="mfm-modal-content">
        <h1 class="mfm-typography__text_l mfm-modal-content__title">
          Are you sure?
        </h1>

        <div class="mfm-modal-content__form">
          {{{submitButton}}}
          {{{cancelButton}}}
        </div>
      </div>
    `;
  }
}
