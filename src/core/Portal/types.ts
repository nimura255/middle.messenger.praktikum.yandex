import type { BaseProps, Block } from '$core/Block';

export type PortalProps = BaseProps & {
  slot: Block;
};
