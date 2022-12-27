import { Block } from '$core/Block';
import type { ProfileInfoFieldProps } from './types';

export class ProfileInfoField extends Block {
  constructor(props: ProfileInfoFieldProps) {
    super(props, {});
  }

  render(): string {
    return `
      <div class="mfm-profile-info-field">
        {{{slot}}}
      </div>
    `;
  }
}
