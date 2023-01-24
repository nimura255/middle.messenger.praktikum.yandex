import type { Block } from '$core/Block';

export type TooltipProps = {
  trigger: Block;
  content: Block;
};

export type PositionParams = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};
