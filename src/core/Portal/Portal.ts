import { Block } from '$core/Block';
import { renderToPortal, removeFromPortal } from './utils';
import type { PortalProps } from './types';

export class Portal extends Block<PortalProps> {
  constructor(props: PortalProps) {
    super(props, {});
  }

  componentDidMount() {
    const element = this.props.slot.element;
    this.props.slot.dispatchComponentDidMount();

    if (element) {
      renderToPortal(element);
    }
  }

  componentWillUnmount() {
    const element = this.props.slot.element;

    if (element) {
      removeFromPortal(element);
    }

    this.props.slot.dispatchComponentWillUnmount();
  }

  render(): string {
    return '';
  }
}
