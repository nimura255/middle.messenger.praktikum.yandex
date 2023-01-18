import { Button } from '$components/Button';
import { setErrorTextByRef } from '$components/FormInput';
import { FormInputs } from '$components/FormInputs';
import { userController } from '$controllers/user';
import { Block, createRef, type BlockRef } from '$core/Block';
import { store, type StoreState } from '$store';
import { extractDataFromSubmitEvent } from '$utils/form';
import { ValidationManager } from '$utils/validation';
import { fieldsParams } from './constants';
import type { FormFieldsData, FieldParams } from './types';

export class ProfileEditContent extends Block {
  fieldsParamsWithRefs: Array<FieldParams & { ref: BlockRef }>;
  validationManager: ValidationManager;
  formInputs: FormInputs;

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

    const saveButton = new Button({
      type: 'submit',
      text: 'Save',
    });

    const propsWithChildren = {
      children: { fields: formInputs, saveButton },
    };

    super(propsWithChildren, {});

    this.fieldsParamsWithRefs = fieldsParamsWithRefs;
    this.validationManager = validationManager;
    this.formInputs = formInputs;
  }

  handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const submittedData = extractDataFromSubmitEvent(
      event
    ) as FormFieldsData;
    this.validationManager.validateForm(submittedData);

    if (this.validationManager.hasErrors) {
      return;
    }

    const errorText = await userController.changeUserProfile(
      submittedData
    );

    if (errorText) {
      this.setProp('submitError', errorText);
    }
  };

  connectFieldsToStore = (storeState: Partial<StoreState>) => {
    const { user } = storeState;

    if (!user) {
      return;
    }

    this.fieldsParamsWithRefs.map(({ name, ref }) => {
      const value = user[name];
      ref.current?.setProp('value', value);
    });
  };

  componentDidMount() {
    this.setProp('events', { submit: this.handleSubmit });
    store.subscribeWithImmediateCall(this.connectFieldsToStore);
  }

  componentWillUnmount() {
    store.unsubscribe(this.connectFieldsToStore);
  }

  render(): string {
    return `
      <div class="mfm-profile-page__main__content">
        <form class="mfm-profile-page__form">
          {{{fields}}}

          {{#if submitError}}
            <p class="mfm-profile-page__form__error mfm-typography__text_m">
              {{submitError}}
            </p>
          {{/if}}

          {{{saveButton}}}
        </form>
      </div>
    `;
  }
}
