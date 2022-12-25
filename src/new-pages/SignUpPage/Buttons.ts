import { Block } from '$core/Block';
import { Button } from '$components/Button';
import { Link } from '$components/Link';

export class Buttons extends Block {
  constructor() {
    const signUpButton = new Button({
      text: 'Sign up',
      type: 'submit',
    });
    const signInLink = new Link({
      text: 'Sign in',
      href: '#',
    });

    const propsWithChildren = {
      children: { signUpButton, signInLink },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      {{{signUpButton}}}
      {{{signInLink}}}
    `;
  }
}
