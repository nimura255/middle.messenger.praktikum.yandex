import type { BaseProps } from '$core/Block';

export type LinkProps = BaseProps & {
  href: string;
  text: string;
};
