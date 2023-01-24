import type { BaseProps } from '$core/Block';

export type IconButtonProps = BaseProps & {
  color?: string;
  shape?: 'circle' | 'square';
  size?: string;
  full?: boolean;
  iconTemplate: string;
};
