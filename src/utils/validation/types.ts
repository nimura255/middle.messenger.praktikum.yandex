import type { BlockRef } from '$core/Block';

export type Validator = (value: string) => string;

export type RulesTable = (value: string) => string;

export type ValidationManagerParams = {
  fields: ValidatedFieldParams[];
  onFieldValidation?: (event: ValidationEvent) => void;
};

export type ValidatedFieldParams = {
  name: string;
  ref: BlockRef;
  rule: Validator;
};

export type ValidationEvent = {
  name: string;
  ref: BlockRef;
  error: string;
};
