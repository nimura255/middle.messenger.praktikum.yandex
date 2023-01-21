import type { Block } from '$core/Block';

export type ModalProps = {
  isActive: boolean;
  slot: typeof Block<Record<string, unknown>>;
};

export type ModalInnerProps = {
  slot: typeof Block<Record<string, unknown>>;
  onOutsideClick?: () => void;
};
