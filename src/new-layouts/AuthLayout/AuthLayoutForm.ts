import { Block, type BaseProps } from '$core/Block';

type AuthLayoutFormProps = BaseProps & {
  children: {
    buttons: Block;
    inputs: Block;
  };
};

export class AuthLayoutForm extends Block {
  constructor(props: AuthLayoutFormProps) {
    super(props, {});
  }

  render(): string {
    return `
      <form class="mfm-auth-page-layout__form-window__form">
        {{{inputs}}}
        <div class="mfm-auth-page-layout__form-window__form__buttons">
          {{{buttons}}}
        </div>
      </form>
    `;
  }
}
