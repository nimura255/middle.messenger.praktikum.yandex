import { Block, createRef } from '$core/Block';
import { AuthLayout } from '$layouts/AuthLayout';
import { setErrorTextByRef } from '$components/FormInput';
import { FormInputs } from '$components/FormInputs';
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
