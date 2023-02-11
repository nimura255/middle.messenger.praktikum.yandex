import { Block } from '$core/Block';
import { Button } from '$components/Button';
import { chevronIcon } from '$iconsTemplates';
import { createClassList } from '$utils/html';
import type { ButtonWithChevronProps } from './types';
import './styles.pcss';

export class ButtonWithChevron extends Block {
  constructor(props: ButtonWithChevronProps) {
    const { direction = 'right' } = props;
    const buttonClassList = createClassList(
      'mfm-button-with-chevron',
      `mfm-button-with-chevron_${direction}`
    );

    const button = new Button({
      variant: 'inline',
      text: `
        <p class="${buttonClassList}">
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
