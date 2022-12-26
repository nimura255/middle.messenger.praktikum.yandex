import { Block } from '$core/Block';
import { AuthLayoutForm } from './AuthLayoutForm';
import type { AuthLayoutProps } from './types';
import './styles.pcss';

export class AuthLayout extends Block {
  constructor(props: AuthLayoutProps) {
    const { children, events, title } = props;

    const form = new AuthLayoutForm({ children, events });

    super(
      {
        title,
        children: { form },
      },
      {
        tagName: 'main',
        className: 'mfm-auth-page-layout',
      }
    );
  }

  render() {
    return `
      <main class="mfm-auth-page-layout">
        <div class="mfm-auth-page-layout__form-window">
          <h1 class="mfm-typography__text_xl">{{title}}</h1>

          {{{form}}}
        </div>
      </main>
    `;
  }
}
