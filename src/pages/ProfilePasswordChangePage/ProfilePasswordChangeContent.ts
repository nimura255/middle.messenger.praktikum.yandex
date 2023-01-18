import { Button } from '$components/Button';
import { setErrorTextByRef } from '$components/FormInput';
import { FormInputs } from '$components/FormInputs';
import { userController } from '$controllers/user';
import { Block, createRef } from '$core/Block';
import { extractDataFromSubmitEvent } from '$utils/form';
import {
  combineValidators,
  validatePasswordRequired,
  ValidationManager,
} from '$utils/validation';
import type { FieldParams, FormValues } from './types';

export class ProfilePasswordChangeContent extends Block {
  fieldsParams: FieldParams[];
  validationManager: ValidationManager;
  formInputs: FormInputs;

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
        label: 'Current password',
        placeholder: 'Current password',
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
        rule: validatePasswordRequired,
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

    const propsWithChildren = {
      children: { fields: formInputs, saveButton },
      events: { input: handlePasswordInput },
    };

    super(propsWithChildren, {});

    this.fieldsParams = fieldsParams;
    this.validationManager = validationManager;
    this.formInputs = formInputs;
  }

  handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const submittedData = extractDataFromSubmitEvent(event) as FormValues;
    this.validationManager.validateForm(submittedData);

    if (this.validationManager.hasErrors) {
      return;
    }

    const errorText = await userController.changePassword(submittedData);

    if (errorText) {
      this.setProp('submitError', errorText);
    }
  };

  componentDidMount() {
    this.setProp('events', {
      ...this.props.events,
      submit: this.handleSubmit,
    });
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
