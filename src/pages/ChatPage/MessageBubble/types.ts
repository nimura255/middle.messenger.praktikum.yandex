import type { BaseProps } from '$core/Block';

export type MessageBubbleProps = BaseProps & {
  imageSrc?: string;
  messageText?: string;
  time: string;
  own?: boolean;
  authorName?: string;
  seen?: boolean;
};
