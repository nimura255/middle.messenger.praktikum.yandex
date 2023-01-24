import type { InputProps } from '$components/Input';

export type FormInputProps = InputProps & {
  label: string;
  errorText?: string;
  value?: string;
};
