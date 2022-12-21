import { Block, type BaseProps } from '$core/Block';
import { FallbackLayout } from '$layouts/FallbackLayout';

export class Fallback500Page extends Block {
  constructor(props: BaseProps) {
    const fallbackLayout = new FallbackLayout({
      code: '500',
      message: 'We are fixing the issue',
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
