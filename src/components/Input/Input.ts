import { Block } from '$core/Block';
import type { InputProps } from './types';
import './styles.pcss';

export class Input extends Block {
  constructor(props: InputProps) {
    super(props, {});
  }

  render(): string {
    return `
      <input
        class="mfm-input mfm-typography__text_m {{#if invalid}}mfm-input_invalid{{/if}}"
        placeholder="{{placeholder}}"
        {{#if name}}
        name="{{name}}"
        {{/if}}
        {{#if disabled}}
        disabled
        {{/if}}
        type="{{type}}"
        {{#if value}}
        value="{{value}}"
        {{/if}}
      >
    `;
  }
}
