import { Block, type BaseProps } from '$core/Block';
import { FallbackLayout } from '$layouts/FallbackLayout';

export class Fallback404Page extends Block {
  constructor(props: BaseProps) {
    const fallbackLayout = new FallbackLayout({
      code: '404',
      message: 'Oops, page not found',
    });

    super(
      {
        ...props,
        children: {
          fallbackLayout: fallbackLayout,
        },
      },
      {}
    );
  }

  render() {
    return '{{{ fallbackLayout }}}';
  }
}
