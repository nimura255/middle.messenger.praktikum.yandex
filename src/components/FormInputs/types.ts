import type { BlockRef } from '$core/Block';

export type FormInputsProps = {
  fieldsParams: FormInputsPropsFieldsParam[];
  onFieldsBlur: (event: FocusEvent) => void;
};

type FormInputsPropsFieldsParam = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  ref: BlockRef;
};
