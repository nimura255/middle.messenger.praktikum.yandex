import { Block } from '$core/Block';
import { FormInput } from '$components/FormInput';

export class Inputs extends Block {
  constructor() {
    const usernameInput = new FormInput({
      name: 'login',
      label: 'Username',
      placeholder: 'Enter username',
    });
    const passwordInput = new FormInput({
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password',
    });

    const propsWithChildren = {
      children: { usernameInput, passwordInput },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      {{{usernameInput}}}
      {{{passwordInput}}}
    `;
  }
}
