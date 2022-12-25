import {
  testForCapitalized,
  testForCapitalLetter,
  testForContainingDigit,
  testForCyrillicWithHyphenOnly,
  testForEmail,
  testForLatinDigitsHyphenAndUnderscore,
  testForLatinWithHyphenOnly,
  testForMax,
  testForMin,
  testForNotEntirelyNumeric,
  testForPhoneNumber,
  testForRequired,
} from './rules';
import { errorMessages } from './errorMessages';
import type { Validator } from './types';

function combineValidators(...validators: Validator[]) {
  return (value: string) => {
    return validators.reduce((result, validator) => {
      return result || validator(value);
    }, '');
  };
}

function createMinLengthValidator(length: number) {
  return (value: string) =>
    testForMin(value, length) ? '' : errorMessages.minLength + `${length}`;
}

function createMaxLengthValidator(length: number) {
  return (value: string) =>
    testForMax(value, length) ? '' : errorMessages.maxLength + `${length}`;
}

function validatePersonName(value: string) {
  const isCyrillicWithHyphen = testForCyrillicWithHyphenOnly(value);
  const isLatinWithHyphen = testForLatinWithHyphenOnly(value);
  const isCapitalized = testForCapitalized(value);

  const isValid =
    (isCyrillicWithHyphen || isLatinWithHyphen) && isCapitalized;

  return isValid ? '' : errorMessages.firstNameLastName;
}

export function validateRequired(value: string) {
  const isValid = testForRequired(value);

  return isValid ? '' : errorMessages.required;
}

function validateNotEntirelyNumeric(value: string) {
  return testForNotEntirelyNumeric(value)
    ? ''
    : errorMessages.notEntirelyNumeric;
}

function validateLatinDigitsHyphenAndUnderscore(value: string) {
  return testForLatinDigitsHyphenAndUnderscore(value)
    ? ''
    : errorMessages.latinWithDigitsHyphenAndUnderScore;
}

function validateForContainDigit(value: string) {
  return testForContainingDigit(value)
    ? ''
    : errorMessages.mustContainDigit;
}

function validateForContainCapitalLetter(value: string) {
  return testForCapitalLetter(value)
    ? ''
    : errorMessages.mustContainCapitalLetter;
}

function validateEmail(value: string) {
  return testForEmail(value) ? '' : errorMessages.email;
}

export const validatePersonNameRequired = combineValidators(
  validateRequired,
  validatePersonName
);

const validateUsername = combineValidators(
  createMinLengthValidator(3),
  createMaxLengthValidator(20),
  validateLatinDigitsHyphenAndUnderscore,
  validateNotEntirelyNumeric
);

export const validateUsernameRequired = combineValidators(
  validateRequired,
  validateUsername
);

export const validateEmailRequired = combineValidators(
  validateRequired,
  validateEmail
);

const validatePassword = combineValidators(
  createMinLengthValidator(8),
  createMaxLengthValidator(40),
  validateForContainCapitalLetter,
  validateForContainDigit
);

export const validatePasswordRequired = combineValidators(
  validateRequired,
  validatePassword
);

const validatePhone = combineValidators(
  (value: string) =>
    testForPhoneNumber(value) ? '' : errorMessages.phoneNumber,
  createMinLengthValidator(10),
  createMaxLengthValidator(15)
);

export const validatePhoneRequired = combineValidators(
  validateRequired,
  validatePhone
);
