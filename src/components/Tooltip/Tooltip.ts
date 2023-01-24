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
      click: (event) => {
        const target = event.target as HTMLElement;

        if (trigger.element?.contains(target)) {
          this.toggleState();
        }
      },
    });
  }

  private getContentContainer = () => {
    return this.element?.querySelector(
      '.mfm-tooltip__content-container'
    ) as HTMLElement | null;
  };

  private show = () => {
    this.setProp('isShown', true);

    const contentContainer = this.getContentContainer();

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

  handleOutsideClick = (event: MouseEvent) => {
    if (!this.props.isShown) {
      return;
    }

    const clickTarget = event.target as HTMLElement;

    if (
      clickTarget !== this.element &&
      !this.element?.contains(clickTarget)
    ) {
      this.hide();
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  render() {
    return `
      <div>
        {{{trigger}}}
        {{#if isShown}}
          <div class="mfm-tooltip__content-container">
            {{{content}}}
          </div>
        {{/if}}
      </div>
    `;
  }
}
