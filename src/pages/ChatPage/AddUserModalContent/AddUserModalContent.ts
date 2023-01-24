import { Button } from '$components/Button';
import { FormInput, setErrorTextByRef } from '$components/FormInput';
import { appController } from '$controllers/app';
import { chatsController } from '$controllers/chats';
import { Block, createRef } from '$core/Block';
import { store } from '$store';
import { extractDataFromSubmitEvent } from '$utils/form';
import { ValidationManager, validateRequired } from '$utils/validation';
import type { AddUserModalContentProps } from './types';

export class AddUserModalContent extends Block {
  constructor(props: AddUserModalContentProps) {
    const formInputRef = createRef();
    const validationManager = new ValidationManager({
      fields: [
        {
          name: 'login',
          ref: formInputRef,
          rule: validateRequired,
        },
      ],
      onFieldValidation: (event) => {
        const { ref, error } = event;

        setErrorTextByRef(error, ref);
      },
    });
    const formInput = new FormInput({
      label: 'Username',
      name: 'login',
      type: 'text',
      ref: formInputRef,
      events: {
        focusout: (event) => {
          const target = event.target as HTMLInputElement;
          validationManager.validateField(target.name, target.value);
        },
      },
    });
    const button = new Button({
      type: 'submit',
      variant: 'primary',
      text: 'Add',
    });

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault();

      const formValues = extractDataFromSubmitEvent(event);
      const { currentChatId } = store.getState();

      validationManager.validateForm(formValues);

      if (!currentChatId || validationManager.hasErrors) {
        return;
      }

      appController.setLoadingSpinnerStatus(true);
      const errorText = await chatsController.addUserToChat({
        chatId: currentChatId,
        username: formValues.login,
      });
      appController.setLoadingSpinnerStatus(false);

      if (errorText) {
        validationManager.insertError('login', errorText);
      } else {
        props.onClose();
      }
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
