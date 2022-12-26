import { Block } from '$core/Block';
import type { ProfileInfoRecordFieldProps } from './types';

export class ProfileInfoRecordField extends Block {
  constructor(props: ProfileInfoRecordFieldProps) {
    super(props, {});
  }

  render(): string {
    return `
      <div class="mfm-profile-info-field">
        <p class="mfm-profile-info-field__name mfm-typography__text_m">
          {{name}}
        </p>
        <p class="mfm-profile-info-field__value mfm-typography__text_m">
          {{value}}
        </p>
      </div>
    `;
  }
}
