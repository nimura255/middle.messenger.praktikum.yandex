import { Block, createRef } from '$core/Block';
import { Button } from '$components/Button';
import { setErrorTextByRef } from '$components/FormInput';
import { FormInputs } from '$components/FormInputs';
import { extractDataFromSubmitEvent } from '$utils/form';
import { ValidationManager } from '$utils/validation';
import { fieldsParams } from './constants';

export class ProfileEditContent extends Block {
  constructor() {
    const fieldsParamsWithRefs = fieldsParams.map((params) => ({
      ...params,
      ref: createRef(),
    }));

    const validationManager = new ValidationManager({
      fields: fieldsParamsWithRefs,
      onFieldValidation: (event) => {
        const { ref, error } = event;

        setErrorTextByRef(error, ref);
      },
    });

    const formInputs = new FormInputs({
      fieldsParams: fieldsParamsWithRefs,
      onFieldsBlur: (event) => {
        const target = event.target as HTMLInputElement;
        validationManager.validateField(target.name, target.value);
      },
    });

    const handleSubmit = (event: SubmitEvent) => {
      event.preventDefault();
      const submittedData = extractDataFromSubmitEvent(event) as Record<
        string,
        string
      >;
      validationManager.validateForm(submittedData);

      if (validationManager.hasErrors) {
        // eslint-disable-next-line no-console
        console.log('Validation error');
      }

      // eslint-disable-next-line no-console
      console.log(submittedData);
    };

    const saveButton = new Button({
      type: 'submit',
      text: 'Save',
    });

    const propsWithChildren = {
      children: { fields: formInputs, saveButton },
      events: { submit: handleSubmit },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `
      <div class="mfm-profile-page__main__content">
        <form class="mfm-profile-page__form">
          {{{fields}}}

          {{{saveButton}}}
        </form>
      </div>
    `;
  }
}
