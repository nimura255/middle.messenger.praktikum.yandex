import { Block, type BaseProps } from '../../core/Block';
type ButtonProps = BaseProps & {
  className: string;
};

export class Button extends Block {
  constructor(props: ButtonProps) {
    // Создаём враппер DOM-элемент button
    super(props, {
      tagName: 'button',
      className: props.className,
    });
  }

  componentDidMount(props: BaseProps) {
    console.log('Button mounted', props);
  }

  render() {
    return `
      {{ child }}
    `;
  }
}
