import { routes } from '$constants/routes';
import { Block } from '$core/Block';
import { ProfileLayout } from '$layouts/ProfileLayout';
import { ProfileEditContent } from './ProfileEditContent';

export class ProfileEditPage extends Block {
  constructor() {
    const content = new ProfileEditContent();
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
