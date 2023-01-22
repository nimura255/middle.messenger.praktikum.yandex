import { Button } from '$components/Button';
import { FormInput } from '$components/FormInput';
import { Block } from '$core/Block';

export class AddUserModalContent extends Block {
  constructor() {
    const formInput = new FormInput({
      label: 'Username',
      name: 'login',
      type: 'text',
    });
    const button = new Button({
      type: 'submit',
      variant: 'primary',
      text: 'Add',
    });

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
    };

    super(
      {
        children: { formInput, button },
        events: { submit: handleSubmit },
      },
      {}
    );
  }

  render(): string {
    return `
      <div class="mfm-modal-content">
        <h1 class="mfm-typography__text_l mfm-modal-content__title">
          Add user
        </h1>

        <form class="mfm-modal-content__form">
          {{{formInput}}}
          {{{button}}}
        </form>
      </div>
    `;
  }
}
