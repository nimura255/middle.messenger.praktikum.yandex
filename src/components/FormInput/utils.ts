import { type BlockRef } from '$core/Block';

export function setErrorTextByRef(errorText: string, ref: BlockRef) {
  ref.current?.setProps((state) => ({
    ...state,
    errorText,
  }));
}
