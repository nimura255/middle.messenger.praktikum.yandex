export type ClassNameParamRecord = Record<string, boolean | null>;
export type ClassNameParam =
  | string
  | null
  | boolean
  | number
  | undefined
  | ClassNameParamRecord
  | ClassNameParam[];
