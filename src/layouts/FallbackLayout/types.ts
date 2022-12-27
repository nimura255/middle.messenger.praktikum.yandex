import type { BaseProps } from '$core/Block';

export type FallbackLayoutProps = BaseProps & {
  code: string;
  message: string;
};
