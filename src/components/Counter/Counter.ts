import { Block } from '$core/Block';
import type { CounterProps } from './types';
import './styles.pcss';

export class Counter extends Block {
  constructor(props: CounterProps) {
    super(props, {});
  }

  render(): string {
    return `
      <div class="mfm-counter">
        <p class="mfm-counter__inner mfm-typography__text_s">
          {{value}}
        </p>
      </div>
    `;
  }
}
