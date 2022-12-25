import { Block } from '$core/Block';
import { Input } from '$components/Input';
import type { FormInputProps } from './types';
import './styles.pcss';

export class FormInput extends Block {
  constructor(props: FormInputProps) {
    const { disabled, invalid, name, placeholder, type } = props;

    const input = new Input({
      disabled,
      invalid,
      name,
      placeholder,
      type,
    });

    const formInputProps = {
      ...props,
      children: { input },
    };

    super(formInputProps, {});
  }

  render(): string {
    return `
      <label class="mfm-form-input">
        <p class="mfm-form-input__label-text mfm-typography__text_xs">
          {{label}}
        </p>
        {{{input}}}
        <p class="mfm-form-input__error-text mfm-typography__text_xs">
          {{errorText}}
        </p>
      </label>
    `;
  }
}
