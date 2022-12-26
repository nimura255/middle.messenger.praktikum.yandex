import type { Block, BaseProps } from '$core/Block';

export type ProfileLayoutProps = BaseProps & {
  goBackRoute: string;
  children: {
    slot: Block;
  };
};
