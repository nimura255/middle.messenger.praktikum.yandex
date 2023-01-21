import { Block } from '$core/Block';
import type { ModalInnerProps } from './types';

export class ModalInner extends Block {
  constructor(props: ModalInnerProps) {
    const slotBlock = new props.slot({}, {});

    const handleClick = (event: MouseEvent) => {
      const modalOverlay = this.element;
      const modalWindow = modalOverlay?.children[0];
      const eventTarget = event.target as Nullable<HTMLElement>;

      if (!modalWindow || !eventTarget || !props.onOutsideClick) {
        return;
      }

      if (
        event.target !== modalWindow &&
        !modalWindow?.contains(eventTarget)
      ) {
        props.onOutsideClick();
      }
    };

    super(
      { children: { slot: slotBlock }, events: { click: handleClick } },
      {}
    );
  }

  render() {
    return `
      <div class="mfm-modal__overlay">
        <div class="mfm-modal__window">
          {{{slot}}}
        </div>
      </div>
    `;
  }
}
