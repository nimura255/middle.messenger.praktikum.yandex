import { Block, createRef } from '$core/Block';
import { AuthLayout } from '$layouts/AuthLayout';
import { setErrorTextByRef } from '$components/FormInput';
import { FormInputs } from '$components/FormInputs';
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
      title: 'Sign in',
      children: { inputs, buttons },
      events: { submit: handleSubmit },
    });

    super({ children: { authLayout } }, {});
  }

  render(): string {
    return `{{{authLayout}}}`;
  }
}
