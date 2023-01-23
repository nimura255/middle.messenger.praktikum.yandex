import { routes } from '$constants/routes';
import { Block } from '$core/Block';
import { Button } from '$components/Button';
import { Link } from '$components/Link';

export class Buttons extends Block {
  constructor() {
    const signInButton = new Button({
      text: 'Sign in',
      type: 'submit',
    });
    const signUpLink = new Link({
      text: 'Sign up',
      href: routes.signUp,
    });

    const propsWithChildren = {
      children: { signInButton, signUpLink },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      <div>
        {{{signInButton}}}
        {{{signUpLink}}}
      </div>
    `;
  }
}
