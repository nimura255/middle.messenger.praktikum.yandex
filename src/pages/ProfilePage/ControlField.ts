import { Block } from '$core/Block';
import { Button } from '$components/Button';
import { ProfileInfoField } from '$components/profileFields';
import type { ControlFieldProps } from './types';

export class ControlField extends Block {
  constructor(props: ControlFieldProps) {
    const button = new Button({
      variant: 'inline',
      text: props.text,
    });
    const infoField = new ProfileInfoField({
      children: { slot: button },
    });

    const propsWithChildren = {
      ...props,
      children: { infoField },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `{{{infoField}}}`;
  }
}
