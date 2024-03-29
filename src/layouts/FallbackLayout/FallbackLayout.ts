import { Block } from '$core/Block';
import { Link } from '$components/Link';
import type { FallbackLayoutProps } from './types';
import './styles.pcss';

export class FallbackLayout extends Block {
  constructor(props: FallbackLayoutProps) {
    const link = new Link({
      href: '/',
      text: 'Return to main page',
    });

    super({ ...props, children: { link } }, {});
  }

  render(): string {
    return `
      <main class="mfm-fallback-page-layout">
        <h1 class="mfm-typography__heading">
          {{ code }}
        </h1>
        <p class="mfm-typography__text_xl">
          {{ message }}
        </p>

        {{{ link }}}
      </main>
    `;
  }
}
