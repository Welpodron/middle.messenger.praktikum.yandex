import type { TDynamicObject } from '@app/types/utils';

const isDynamicObject = (obj: unknown): obj is TDynamicObject => {
  return typeof obj === 'object' && obj != null;
};

// TODO: Данная функция не поддерживает другие структуры данных, такие как ArrayBuffer, Buffer и т.д.
export const deepClone = <T>(obj: T): T => {
  if (!isDynamicObject(obj)) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Map) {
    const clone = new Map();

    for (const [key, value] of obj) {
      clone.set(key, deepClone(value));
    }

    return clone as T;
  }

  if (obj instanceof Set) {
    const clone = new Set();

    for (const value of obj) {
      clone.add(deepClone(value));
    }

    return clone as T;
  }

  if (Array.isArray(obj)) {
    const clone = obj.map(item => deepClone(item));

    return clone as T;
  }

  if (obj?.constructor === Object) {
    const clone: TDynamicObject = {};

    for (const [key, value] of Object.entries(obj)) {
      clone[key] = deepClone(value);
    }

    return clone as T;
  }

  return obj;
};
