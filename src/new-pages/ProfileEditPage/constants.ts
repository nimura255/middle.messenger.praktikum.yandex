import {
  validateEmailRequired,
  validateUsernameRequired,
  validatePersonNameRequired,
  validatePhoneRequired,
} from '$utils/validation';

export const fieldsParams = [
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
    name: 'first_name',
    label: 'First name',
    type: 'text',
    placeholder: 'First name',
    rule: validatePersonNameRequired,
  },
  {
    name: 'second_name',
    label: 'Second name',
    type: 'text',
    placeholder: 'Second name',
    rule: validatePersonNameRequired,
  },
  {
    name: 'display_name',
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
