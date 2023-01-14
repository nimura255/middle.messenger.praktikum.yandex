import { Block } from '$core/Block';
import { loadingSpinner } from '$iconsTemplates';
import './styles.pcss';

export class LoadingOverlay extends Block {
  constructor() {
    super({}, {});
  }

  render(): string {
    return `
      <div class="mfm-loading-overlay">
        ${loadingSpinner}
      </div>
    `;
  }
}
