import type { BlockRef } from '$core/Block';

export type Validator = (value: string) => string;

export type RulesTable = (value: string) => string;

export type FormValidatorParams = {
  fields: ValidatedFieldParams[];
};

export type ValidatedFieldParams = {
  name: string;
  ref: BlockRef;
  rule: Validator;
};
