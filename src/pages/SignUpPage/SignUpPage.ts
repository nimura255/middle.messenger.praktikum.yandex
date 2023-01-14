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
  validateEmailRequired,
  validatePersonNameRequired,
  validatePhoneRequired,
  ValidationManager,
} from '$utils/validation';

type FormData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export class SignUpPage extends Block {
  constructor() {
    const fieldsParams = [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter email',
        ref: createRef(),
        rule: validateEmailRequired,
      },
      {
        name: 'login',
        label: 'Username',
        placeholder: 'Enter username',
        ref: createRef(),
        rule: validateUsernameRequired,
      },
      {
        name: 'first_name',
        label: 'First name',
        placeholder: 'Enter first name',
        ref: createRef(),
        rule: validatePersonNameRequired,
      },
      {
        name: 'second_name',
        label: 'Second name',
        placeholder: 'Enter second name',
        ref: createRef(),
        rule: validatePersonNameRequired,
      },
      {
        name: 'phone',
        label: 'Phone number',
        placeholder: 'Enter phone number',
        ref: createRef(),
        rule: validatePhoneRequired,
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
      fieldsParams: Object.values(fieldsParams),
      onFieldsBlur: (event) => {
        const target = event.target as HTMLInputElement;
        validationManager.validateField(target.name, target.value);
      },
    });
    const buttons = new Buttons();

    const handleSubmit = async (event: SubmitEvent) => {
      event.preventDefault();
      const submittedData = extractDataFromSubmitEvent(event) as FormData;
      validationManager.validateForm(submittedData);

      if (validationManager.hasErrors) {
        return;
      }

      appController.setLoadingSpinnerStatus(true);
      const errorText = await authController.signUp(submittedData);
      appController.setLoadingSpinnerStatus(false);

      if (errorText) {
        validationManager.insertError('password', errorText);
      }
    };

    const authLayout = new AuthLayout({
      title: 'Sign up',
      children: { inputs, buttons },
      events: { submit: handleSubmit },
    });

    super({ children: { authLayout } }, {});
  }

  render(): string {
    return `{{{authLayout}}}`;
  }
}
