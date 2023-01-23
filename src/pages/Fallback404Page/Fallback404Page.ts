import { Block } from '$core/Block';
import { FallbackLayout } from '$layouts/FallbackLayout';

export class Fallback404Page extends Block {
  constructor() {
    const fallbackLayout = new FallbackLayout({
      code: '404',
      message: 'Oops, page not found',
    });

    super({ children: { slot: fallbackLayout } }, {});
  }

  render() {
    return '{{{slot}}}';
  }
}
