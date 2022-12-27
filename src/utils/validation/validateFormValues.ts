import type { Validator } from './types';

export function validateFormValues(
  formValues: Record<string, string>,
  validatorsTable: Record<string, Validator>
): Record<string, string> {
  const validatorsTableEntries = Object.entries(validatorsTable);
  const result: Record<string, string> = {};

  validatorsTableEntries.forEach(([fieldName, validator]) => {
    result[fieldName] = validator(formValues[fieldName]);
  });

  return result;
}
