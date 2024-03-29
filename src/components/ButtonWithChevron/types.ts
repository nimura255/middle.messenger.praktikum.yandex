import type { BaseProps } from '$core/Block';

export type ButtonWithChevronProps = BaseProps & {
  text: string;
  direction?: 'down' | 'up' | 'left' | 'right';
};
