import { Button } from '$components/Button';
import { FormInput } from '$components/FormInput';
import { appController } from '$controllers/app';
import { chatsController } from '$controllers/chats';
import { Block } from '$core/Block';
import { extractDataFromSubmitEvent } from '$utils/form';
import type { NewChatModalContentProps } from './types';

export class NewChatModalContent extends Block {
  constructor(props: NewChatModalContentProps) {
    const submitButton = new Button({
      text: 'Create',
      type: 'submit',
      variant: 'primary',
    });
    const chatNameInput = new FormInput({
      name: 'title',
      label: 'Chat name',
      type: 'text',
    });

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault();

      const { title } = extractDataFromSubmitEvent(event);

      appController.setLoadingSpinnerStatus(true);
      await chatsController.createChat({
        title: title || '',
      });
      appController.setLoadingSpinnerStatus(false);

      props.onClose();
    };

    super(
      {
        children: { chatNameInput, submitButton },
        events: {
          submit: handleSubmit,
        },
      },
      {}
    );
  }

  render() {
    return `
      <div class="mfm-modal-content">
        <h1 class="mfm-typography__text_l mfm-modal-content__title">
          Create new chat
        </h1>

        <form class="mfm-modal-content__form">
          {{{chatNameInput}}}
          {{{submitButton}}}
        </form>
      </div>
    `;
  }
}
