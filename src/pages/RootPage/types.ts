import type { BaseProps } from '$core/Block';

export type ListItemProps = BaseProps & {
  path: string;
  name: string;
};
