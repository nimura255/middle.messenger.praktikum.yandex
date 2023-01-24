import type { Block, BaseProps } from '$core/Block';

export type ModalProps = {
  isActive: boolean;
  slot: typeof Block<Record<string, unknown>>;
  slotProps?: BaseProps;
};

export type ModalInnerProps = {
  slot: typeof Block<Record<string, unknown>>;
  slotProps?: BaseProps;
  onOutsideClick?: () => void;
};
