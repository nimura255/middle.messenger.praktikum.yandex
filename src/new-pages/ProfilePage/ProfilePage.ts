import { Block } from '$core/Block';
import { ProfileLayout } from '$layouts/ProfileLayout';
import { ProfilePageContent } from './ProfilePageContent';

export class ProfilePage extends Block {
  constructor() {
    const content = new ProfilePageContent();
    const layout = new ProfileLayout({
      goBackRoute: '/chat',
      children: {
        slot: content,
      },
    });

    const propsWithChildren = {
      children: { layout },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `{{{layout}}}`;
  }
}
