import type {
  TDynamicObject,
  TObjectKeyPath,
  TObjectKeyPathValue,
} from '@app/types/utils';

export const deepGet = <TObject extends TDynamicObject, TKeyPath extends TObjectKeyPath<TObject>>(
  obj: TObject,
  keypath: TKeyPath,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return keypath.split('.').reduce((acc: any, key) => acc?.[key], obj) as TObjectKeyPathValue<TObject, TKeyPath>;
};
