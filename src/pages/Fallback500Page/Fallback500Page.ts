import { Block } from '$core/Block';
import { FallbackLayout } from '$layouts/FallbackLayout';

export class Fallback500Page extends Block {
  constructor() {
    const fallbackLayout = new FallbackLayout({
      code: '500',
      message: 'We are fixing the issue',
    });

    super({ children: { fallbackLayout: fallbackLayout } }, {});
  }

  render() {
    return '{{{ fallbackLayout }}}';
  }
}
