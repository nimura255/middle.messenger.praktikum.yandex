import { Button } from '$components/Button';
import { appController } from '$controllers/app';
import { chatsController } from '$controllers/chats';
import { Block } from '$core/Block';
import type { LeaveChatModalContentProps } from './types';

export class LeaveChatModalContent extends Block {
  constructor(props: LeaveChatModalContentProps) {
    const handleSubmit = async () => {
      appController.setLoadingSpinnerStatus(true);
      await chatsController.leaveCurrentChat();
      appController.setLoadingSpinnerStatus(false);
      props.onClose();
    };

    const cancelButton = new Button({
      text: 'Cancel',
      variant: 'secondary',
      events: { click: props.onClose },
    });
    const submitButton = new Button({
      text: 'Leave chat',
      variant: 'primary',
      events: { click: handleSubmit },
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
