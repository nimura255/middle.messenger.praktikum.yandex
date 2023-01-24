import { routes } from '$constants/routes';
import { Block } from '$core/Block';
import { ProfileLayout } from '$layouts/ProfileLayout';
import { ProfilePasswordChangeContent } from './ProfilePasswordChangeContent';

export class ProfilePasswordChangePage extends Block {
  constructor() {
    const content = new ProfilePasswordChangeContent();
    const layout = new ProfileLayout({
      goBackRoute: routes.settings,
      children: { slot: content },
    });

    super({ children: { layout } }, {});
  }

  render(): string {
    return '{{{layout}}}';
  }
}
