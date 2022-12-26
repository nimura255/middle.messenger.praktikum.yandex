import type { Block, BaseProps } from '$core/Block';

export type ProfileInfoFieldProps = BaseProps & {
  children: {
    slot: Block;
  };
};

export type ProfileInfoRecordFieldProps = BaseProps & {
  name: string;
  value: string;
};
