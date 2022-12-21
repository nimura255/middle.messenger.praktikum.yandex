import { Block } from '$core/Block';
import type { AuthLayoutProps } from './types';
import './styles.pcss';

export class AuthLayout extends Block {
  constructor(props: AuthLayoutProps) {
    super(props, {
      tagName: 'main',
      className: 'mfm-auth-page-layout',
    });
  }

  // render() {
  //   return `
  //     <div class="mfm-auth-page-layout__form-window">
  //       <h1 class="mfm-typography__text_xl">{{title}}</h1>
  //
  //       <form class="mfm-auth-page-layout__form-window__form">
  //         <fieldset class="mfm-auth-page-layout__form-window__form__fields">
  //           {{{inputs}}}
  //         </fieldset>
  //         <div class="mfm-auth-page-layout__form-window__form__buttons">
  //           {{{buttons}}}
  //         </div>
  //       </form>
  //     </div>
  //   `;
  // }

  render() {
    return `
      <main class="mfm-auth-page-layout">
        <div class="mfm-auth-page-layout__form-window">
          <h1 class="mfm-typography__text_xl">{{title}}</h1>

          <form class="mfm-auth-page-layout__form-window__form">
            <fieldset class="mfm-auth-page-layout__form-window__form__fields">
              {{{inputs}}}
            </fieldset>
            <div class="mfm-auth-page-layout__form-window__form__buttons">
              {{{buttons}}}
            </div>
          </form>
        </div>
      </main>
    `;
  }
}
