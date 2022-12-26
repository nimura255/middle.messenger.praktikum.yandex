import type { BaseProps } from '$core/Block';

export type ArrowButtonProps = BaseProps & {
  type?: string;
  direction?: 'left' | 'right';
};
