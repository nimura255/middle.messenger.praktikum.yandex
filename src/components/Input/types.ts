import type { BaseProps } from '$core/Block';

export type InputProps = BaseProps & {
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
};
