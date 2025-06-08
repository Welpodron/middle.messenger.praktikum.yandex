import type { TDynamicObject, TObjectKeyPath, TObjectKeyPathValue } from '@app/types/utils';

import { deepClone } from '@utils/deepClone';

export const deepSet = <TObject extends TDynamicObject, TKeyPath extends TObjectKeyPath<TObject>>(obj: TObject, keypath: TKeyPath, value: TObjectKeyPathValue<TObject, TKeyPath>) => {
  const clone = deepClone(obj);

  keypath.split('.').reduce((acc, key, index, arr) => {
    if (index === arr.length - 1) {
      acc[key] = value;
    }
    else {
      const isKeyNumeric = !isNaN(Number(key));

      acc[key] = acc[key] ?? (isKeyNumeric ? [] : {});
    }

    return acc[key] as TDynamicObject;
  }, clone as TDynamicObject);

  return clone as TObject;
};
