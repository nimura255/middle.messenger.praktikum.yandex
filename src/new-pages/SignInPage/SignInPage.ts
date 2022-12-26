import { Block, createRef } from '$core/Block';
import { AuthLayout } from '$layouts/AuthLayout';
import { FormInputs } from '$components/FormInputs';
import { Buttons } from './Buttons';
import { extractDataFromSubmitEvent } from '$utils/form';
import {
  validatePasswordRequired,
  validateUsernameRequired,
  FormValidator,
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

    const formValidator = new FormValidator({
      fields: fieldsParams,
    });

    const inputs = new FormInputs({
      fieldsParams: fieldsParams,
      onFieldsBlur: (event) => {
        const target = event.target as HTMLInputElement;
        formValidator.validateField(target.name, target.value);
      },
    });
    const buttons = new Buttons();

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const submittedData = extractDataFromSubmitEvent(event) as Record<
        string,
        string
      >;
      formValidator.validateForm(submittedData);

      if (formValidator.hasErrors) {
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
