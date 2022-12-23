import { Block } from '$core/Block';
import { AuthLayout } from '$layouts/AuthLayout';
import { Inputs } from './Inputs';
import { Buttons } from './Buttons';
import { extractDataFromSubmitEvent } from '$utils/form';

export class SignInPage extends Block {
  constructor() {
    const inputs = new Inputs();
    const buttons = new Buttons();

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();

      const submittedData = extractDataFromSubmitEvent(event);

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
