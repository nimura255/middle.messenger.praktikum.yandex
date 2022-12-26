import { Block } from '$core/Block';
import { Button } from '$components/Button';
import { chevronIcon } from '$iconsTemplates';
import type { ButtonWithChevronProps } from './types';
import './styles.pcss';

export class ButtonWithChevron extends Block {
  constructor(props: ButtonWithChevronProps) {
    const button = new Button({
      variant: 'inline',
      text: `
        <p class="mfm-button-with-chevron">
          ${props.text}
          ${chevronIcon}
        </p>
      `,
    });

    const propsWithChildren = {
      ...props,
      children: { button },
    };

    super(propsWithChildren, {});
  }

  render(): string {
    return `{{{button}}}`;
  }
}
