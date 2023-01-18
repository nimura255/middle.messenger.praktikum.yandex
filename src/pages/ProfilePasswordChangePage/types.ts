import type { BlockRef } from '$core/Block';
import type { Validator } from '$utils/validation';

export type FieldParams = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  ref: BlockRef;
  rule: Validator;
};

export type FormValues = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};
