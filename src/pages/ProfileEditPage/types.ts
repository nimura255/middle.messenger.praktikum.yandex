import type { Validator } from '$utils/validation';

export type FieldParams = {
  name:
    | 'email'
    | 'login'
    | 'firstName'
    | 'secondName'
    | 'displayName'
    | 'phone';
  label: string;
  type: string;
  placeholder: string;
  rule?: Validator;
};

export type FormFieldsData = {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
};
