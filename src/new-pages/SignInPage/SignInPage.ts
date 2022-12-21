import { Block } from '$core/Block';
import { AuthLayout } from '$layouts/AuthLayout';
import { Inputs } from './Inputs';
import { Buttons } from './Buttons';

export class SignInPage extends Block {
  constructor() {
    const inputs = new Inputs();
    const buttons = new Buttons();

    const authLayout = new AuthLayout({
      title: 'Sign in',
      children: { inputs, buttons },
    });

    super(
      {
        children: { authLayout },
      },
      {}
    );
  }

  render(): string {
    return `{{{authLayout}}}`;
  }
}
