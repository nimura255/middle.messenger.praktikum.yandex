import { Button } from '$components/Button';
import { FormInput } from '$components/FormInput';
import { Block } from '$core/Block';

export class NewChatModalContent extends Block {
  constructor() {
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

    super(
      {
        children: { chatNameInput, submitButton },
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
