import type { BaseProps, Block } from '$core/Block';

export type AuthLayoutProps = BaseProps & {
  title: string;
  children: {
    buttons: Block;
    inputs: Block;
  };
};
