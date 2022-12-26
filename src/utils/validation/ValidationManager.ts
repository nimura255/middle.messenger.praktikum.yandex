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
  };

  validateField = (name: string, value: string) => {
    const fieldValidationParams = this.fieldsMap.get(name);

    if (!fieldValidationParams?.rule) {
      return;
    }

    const errorText = fieldValidationParams?.rule(value) || '';
    this.insertError(name, errorText);

    if (this.onFieldValidation) {
      this.onFieldValidation({
        name,
        ref: fieldValidationParams.ref,
        error: errorText,
      });
    }
    // this.displayFieldError(name);
  };

  validateForm = (valuesRecord: Record<string, string>) => {
    this.fieldsMap.forEach((value) => {
      this.validateField(value.name, valuesRecord[value.name]);
    });
  };

  get hasErrors() {
    return Object.values(this.errors).find(Boolean);
  }

  // private displayFieldError = (name: string) => {
  //   const fieldParams = this.fieldsMap.get(name);
  //   const errorText = this.errors[name];
  //
  //   if (!fieldParams?.ref) {
  //     return;
  //   }
  //
  //   fieldParams.ref.current?.setProps((state) => ({
  //     ...state,
  //     errorText,
  //     invalid: errorText,
  //   }));
  // };
}
