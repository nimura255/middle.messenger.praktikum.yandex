import { Block } from '$core/Block';
import { formatDate } from './utils';
import type { MessagesListDateMarkerProps } from './types';

export class MessagesListDateMarker extends Block {
  constructor(props: MessagesListDateMarkerProps) {
    super({ date: formatDate(props.date) }, {});
  }

  render() {
    const classList = [
      'mfm-chat-page__chat-column__messages-list__date-marker',
      'mfm-typography__text_m',
    ];

    return `
      <div class="${classList.join(' ')}">
        {{date}}
      </div>
    `;
  }
}
