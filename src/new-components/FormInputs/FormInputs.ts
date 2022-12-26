import { Block } from '$core/Block';
import { makeChildrenFromList } from '$core/makeChildrenFromList';
import { FormInput } from '$components/FormInput';
import type { FormInputsProps } from './types';

export class FormInputs extends Block {
  constructor(props: FormInputsProps) {
    const fields = props.fieldsParams.map((params) => {
      return new FormInput({
        name: params.name,
        label: params.label,
        type: params.type,
        placeholder: params.placeholder,
        ref: params.ref,
      });
    });

    const { children, template } = makeChildrenFromList(fields);

    const propsWithChildren = {
      ...props,
      children,
      events: {
        focusout: (event: FocusEvent) => {
          const target = event.target as HTMLElement;

          if (target.tagName === 'INPUT') {
            props.onFieldsBlur(event);
          }
        },
      },
    };

    super(propsWithChildren, {});

    this.setState({ inputsTemplate: template });
  }

  render(): string {
    return `
      ${this.state.inputsTemplate}
    `;
  }
}
