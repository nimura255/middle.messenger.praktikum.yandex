import { Block } from '$core/Block';
import { Portal } from '$core/Portal';
import { ModalInner } from './ModalInner';
import type { ModalProps } from './types';
import './styles.pcss';

export class Modal extends Block {
  constructor(props: ModalProps) {
    super(props, {});
  }

  handleIsActiveChange(props: ModalProps) {
    const { isActive } = props;

    if (isActive) {
      const slot = new ModalInner({
        slot: props.slot,
        onOutsideClick: this.handleModalClose,
      });
      const portal = new Portal({ slot }) as unknown as Block;

      this.setProp('children', { portal });
    } else {
      this.setProp('children', {});
    }
  }

  handleModalClose = () => {
    this.setProp('isActive', false);
  };

  componentDidUpdate(oldProps: ModalProps, newProps: ModalProps) {
    if (oldProps.isActive !== newProps.isActive) {
      this.handleIsActiveChange(newProps);
    }
  }

  render() {
    return '{{{portal}}}';
  }
}
