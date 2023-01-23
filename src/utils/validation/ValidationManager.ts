import type {
  ValidatedFieldParams,
  ValidationManagerParams,
  ValidationEvent,
} from './types';

export class ValidationManager {
  errors: Record<string, string> = {};
  private fieldsMap: Map<string, ValidatedFieldParams>;
  private readonly onFieldValidation?: (params: ValidationEvent) => void;

  constructor(params: ValidationManagerParams) {
    this.fieldsMap = new Map(
      params.fields.map((fieldParams) => {
        return [fieldParams.name, fieldParams];
      })
    );
    this.onFieldValidation = params.onFieldValidation;
  }

  insertError = (fieldName: string, fieldError: string) => {
    this.errors[fieldName] = fieldError;
    const fieldValidationParams = this.fieldsMap.get(fieldName);

    if (!fieldValidationParams) {
      return;
    }

    if (this.onFieldValidation) {
      this.onFieldValidation({
        name: fieldName,
        ref: fieldValidationParams.ref,
        error: fieldError,
      });
    }
  };

  validateField = (name: string, value: string) => {
    const fieldValidationParams = this.fieldsMap.get(name);

    if (!fieldValidationParams?.rule) {
      return;
    }

    const errorText = fieldValidationParams?.rule(value) || '';
    this.insertError(name, errorText);
  };

  validateForm = (valuesRecord: Record<string, string>) => {
    this.fieldsMap.forEach((value) => {
      this.validateField(value.name, valuesRecord[value.name]);
    });
  };

  get hasErrors() {
    return Object.values(this.errors).find(Boolean);
  }
}
