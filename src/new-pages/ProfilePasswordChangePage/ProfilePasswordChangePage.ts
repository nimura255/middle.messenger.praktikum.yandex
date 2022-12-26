import { Block } from '$core/Block';
import { ProfileLayout } from '$layouts/ProfileLayout';
import { ProfilePasswordChangeContent } from './ProfilePasswordChangeContent';

export class ProfilePasswordChangePage extends Block {
  constructor() {
    const content = new ProfilePasswordChangeContent();
    const layout = new ProfileLayout({
      goBackRoute: '/profile',
      children: { slot: content },
    });

    super({ children: { layout } }, {});
  }

  render(): string {
    return '{{{layout}}}';
  }
}
