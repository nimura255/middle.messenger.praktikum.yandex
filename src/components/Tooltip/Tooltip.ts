import { Block } from '$core/Block';
import { getStylesFromPositionParams, getTooltipPosition } from './utils';
import type { TooltipProps } from './types';
import './styles.pcss';

export class Tooltip extends Block {
  trigger: Block;
  content: Block;

  constructor(props: TooltipProps) {
    const content = props.content;
    const trigger = props.trigger;

    super(
      {
        isShown: false,
        children: { content, trigger },
      },
      {}
    );

    this.content = content;
    this.trigger = trigger;
    this.setProp('events', {
      click: () => {
        this.toggleState();
      },
    });
  }

  private show = () => {
    this.setProp('isShown', true);

    const contentContainer = this.element?.querySelector(
      '.mfm-tooltip__content-container'
    ) as HTMLElement;

    if (
      !this.content.element ||
      !this.trigger.element ||
      !contentContainer
    ) {
      return;
    }

    const positionParams = getTooltipPosition({
      contentElement: this.content.element,
      triggerElement: this.trigger.element,
      gap: 12,
    });
    const styles = getStylesFromPositionParams(positionParams);

    contentContainer.style.top = styles.top;
    contentContainer.style.bottom = styles.bottom;
    contentContainer.style.left = styles.left;
    contentContainer.style.right = styles.right;
  };

  private hide = () => {
    this.setProp('isShown', false);
  };

  private toggleState = () => {
    if (this.props.isShown) {
      this.hide();
    } else {
      this.show();
    }
  };

  render() {
    return `
      <div>
        {{{trigger}}}
      </div>
      {{#if isShown}}
        <div class="mfm-tooltip__content-container">
          {{{content}}}
        </div>
      {{/if}}
    `;
  }
}
