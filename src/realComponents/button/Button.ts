import { Block, type BaseProps } from '../../core/Block';
import { template } from './template';

export class Button extends Block {
  constructor(props: BaseProps) {
    // Создаём враппер DOM-элемент button
    super('div', props);
  }

  componentDidMount(props: BaseProps) {
    console.log('Button mounted', props);
  }

  render() {
    return template;
  }
}
