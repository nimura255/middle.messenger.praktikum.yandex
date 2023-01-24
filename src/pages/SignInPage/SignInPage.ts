import { Block, createRef } from '$core/Block';
import { AuthLayout } from '$layouts/AuthLayout';
import { setErrorTextByRef } from '$components/FormInput';
import { FormInputs } from '$components/FormInputs';
import { appController } from '$controllers/app';
import { authController } from '$controllers/auth';
import { Buttons } from './Buttons';
import { extractDataFromSubmitEvent } from '$utils/form';
import {
  validatePasswordRequired,
  validateUsernameRequired,
  ValidationManager,
} from '$utils/validation';

export class SignInPage extends Block {
  constructor() {
    const fieldsParams = [
      {
        name: 'login',
        label: 'Username',
        placeholder: 'Enter username',
        ref: createRef(),
        rule: validateUsernameRequired,
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        ref: createRef(),
        rule: validatePasswordRequired,
      },
    ];

    const validationManager = new ValidationManager({
      fields: fieldsParams,
      onFieldValidation: (event) => {
        const { ref, error } = event;

        setErrorTextByRef(error, ref);
      },
    });

    const inputs = new FormInputs({
      fieldsParams: fieldsParams,
      onFieldsBlur: (event) => {
        const target = event.target as HTMLInputElement;
        validationManager.validateField(target.name, target.value);
      },
    });
    const buttons = new Buttons();

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault();
      const submittedData = extractDataFromSubmitEvent(event);
      validationManager.validateForm(submittedData);

      if (validationManager.hasErrors) {
        return;
      }

      const { login, password } = submittedData;

      appController.setLoadingSpinnerStatus(true);
      const errorText = await authController.signIn({ login, password });
      appController.setLoadingSpinnerStatus(false);

      if (errorText) {
        validationManager.insertError('password', errorText);
      }
    };

    const authLayout = new AuthLayout({
      title: 'Sign in',
      children: { inputs, buttons },
      events: { submit: handleSubmit },
    });

    super({ children: { authLayout } }, {});
  }

  render() {
    return `{{{authLayout}}}`;
  }
}
