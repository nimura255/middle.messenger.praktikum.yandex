import { Block } from '$core/Block';
import { searchIcon } from '$iconsTemplates';
import type { SearchInputProps } from './types';
import './styles.pcss';

export class SearchInput extends Block {
  constructor(props: SearchInputProps) {
    super(props, {});
  }

  render(): string {
    return `
      <label class="mfm-search-input__container">
        ${searchIcon}
        <input
          class="mfm-search-input__input mfm-typography__text_m"
          {{#if placeholder}}placeholder={{placeholder}}{{/if}}
        />
      </label>
    `;
  }
}
