import { Block } from '$core/Block';
import { ArrowButton } from '$components/ArrowButton';
import { Link as RouterLink } from '$core/router';
import type { ProfileLayoutProps } from './types';
import './styles.pcss';

export class ProfileLayout extends Block {
  constructor(props: ProfileLayoutProps) {
    const arrowButton = new ArrowButton({
      direction: 'left',
    });
    const goBackLink = new RouterLink({
      path: props.goBackRoute,
      children: { slot: arrowButton },
    });

    const propsWithChildren = {
      ...props,
      children: {
        goBackLink,
        slot: props.children.slot,
      },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      <main class="mfm-profile-page">
        <div class="mfm-profile-page__go-back-button-column">
          {{{goBackLink}}}
        </div>

        <div class="mfm-profile-page__main">
          {{{slot}}}
        </div>
      </main>
    `;
  }
}
