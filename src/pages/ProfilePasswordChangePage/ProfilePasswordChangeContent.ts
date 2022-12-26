import { Block, createRef } from '$core/Block';
import { setErrorTextByRef } from '$components/FormInput';
import { FormInputs } from '$components/FormInputs';
import { extractDataFromSubmitEvent } from '$utils/form';
import {
  combineValidators,
  validatePasswordRequired,
  ValidationManager,
} from '$utils/validation';
import { Button } from '$components/Button';

export class ProfilePasswordChangeContent extends Block {
  constructor() {
    let newPasswordValue = '';

    const validateConfirmPassword = (value: string) => {
      if (newPasswordValue !== value) {
        return "Password doesn't match";
      }

      return '';
    };

    const fieldsParams = [
      {
        name: 'oldPassword',
        label: 'Curent password',
        placeholder: 'Curent password',
        type: 'password',
        ref: createRef(),
        rule: validatePasswordRequired,
      },
      {
        name: 'newPassword',
        label: 'New password',
        placeholder: 'New password',
        type: 'password',
        ref: createRef(),
        validatePasswordRequired,
      },
      {
        name: 'newPasswordConfirm',
        label: 'Confirm new password',
        placeholder: 'Enter new password again',
        type: 'password',
        ref: createRef(),
        rule: combineValidators(
          validatePasswordRequired,
          validateConfirmPassword
        ),
      },
    ];

    const validationManager = new ValidationManager({
      fields: fieldsParams,
      onFieldValidation: (event) => {
        const { ref, error } = event;

        setErrorTextByRef(error, ref);
      },
    });

    const formInputs = new FormInputs({
      fieldsParams,
      onFieldsBlur: (event) => {
        const target = event.target as HTMLInputElement;
        validationManager.validateField(target.name, target.value);
      },
    });

    const saveButton = new Button({
      type: 'submit',
      text: 'Save',
    });

    const handlePasswordInput = (event: InputEvent) => {
      const target = event.target as HTMLInputElement;

      if (target.name === 'newPassword') {
        newPasswordValue = target.value;
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const submittedData = extractDataFromSubmitEvent(event) as Record<
        string,
        string
      >;
      validationManager.validateForm(submittedData);

      if (validationManager.hasErrors) {
        // eslint-disable-next-line no-console
        console.log('Validation error');
      }

      // eslint-disable-next-line no-console
      console.log(submittedData);
    };

    const propsWithChildren = {
      children: { fields: formInputs, saveButton },
      events: {
        input: handlePasswordInput,
        submit: handleSubmit,
      },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      <div class="mfm-profile-page__main__content">
        <form class="mfm-profile-page__form">
          <fieldset>
            {{{fields}}}
          </fieldset>

          {{{saveButton}}}
        </form>
      </div>
    `;
  }
}
