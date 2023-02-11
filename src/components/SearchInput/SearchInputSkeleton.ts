import { Block } from '$core/Block';
import './styles.pcss';

export class SearchInputSkeleton extends Block {
  constructor() {
    super({}, {});
  }

  render(): string {
    return `
      <label class="mfm-search-input__container">
      </label>
    `;
  }
}
