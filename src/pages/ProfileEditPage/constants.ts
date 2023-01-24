import {
  validateEmailRequired,
  validateUsernameRequired,
  validatePersonNameRequired,
  validatePhoneRequired,
} from '$utils/validation';
import type { FieldParams } from './types';

export const fieldsParams: FieldParams[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Email',
    rule: validateEmailRequired,
  },
  {
    name: 'login',
    label: 'Username',
    type: 'text',
    placeholder: 'Username',
    rule: validateUsernameRequired,
  },
  {
    name: 'firstName',
    label: 'First name',
    type: 'text',
    placeholder: 'First name',
    rule: validatePersonNameRequired,
  },
  {
    name: 'secondName',
    label: 'Second name',
    type: 'text',
    placeholder: 'Second name',
    rule: validatePersonNameRequired,
  },
  {
    name: 'displayName',
    label: 'Display name',
    type: 'text',
    placeholder: 'Display name',
  },
  {
    name: 'phone',
    label: 'Phone number',
    type: 'tel',
    placeholder: 'Phone number',
    rule: validatePhoneRequired,
  },
];
