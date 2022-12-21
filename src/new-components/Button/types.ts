import type { BaseProps } from '$core/Block';

export type ButtonProps = BaseProps & {
  text: string;
  variant?: 'primary' | 'secondary' | 'inline';
  type?: 'button' | 'submit';
};
