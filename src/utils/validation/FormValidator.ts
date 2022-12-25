import type { ValidatedFieldParams, FormValidatorParams } from './types';

export class FormValidator {
  errors: Record<string, string> = {};
  private fieldsMap: Map<string, ValidatedFieldParams>;

  constructor(params: FormValidatorParams) {
    this.fieldsMap = new Map(
      params.fields.map((fieldParams) => {
        return [fieldParams.name, fieldParams];
      })
    );
  }

  insertError = (fieldName: string, fieldError: string) => {
    this.errors[fieldName] = fieldError;
  };

  validateField = (name: string, value: string) => {
    const fieldValidationParams = this.fieldsMap.get(name);

    this.insertError(name, fieldValidationParams?.rule(value) || '');
    this.displayFieldError(name);
  };

  validateForm = (valuesRecord: Record<string, string>) => {
    this.fieldsMap.forEach((value) => {
      this.validateField(value.name, valuesRecord[value.name]);
    });
  };

  get hasErrors() {
    return Object.values(this.errors).find(Boolean);
  }

  private displayFieldError = (name: string) => {
    const fieldParams = this.fieldsMap.get(name);
    const errorText = this.errors[name];

    if (!fieldParams?.ref) {
      return;
    }

    fieldParams.ref.current?.setProps((state) => ({
      ...state,
      errorText,
      invalid: errorText,
    }));
  };
}
