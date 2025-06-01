const findMapKey = (iter: Map<unknown, unknown>, target: unknown) => {
  for (const key of iter.keys()) {
    if (deepCompare(key, target)) {
      return key;
    }
  }

  return undefined;
};

// TODO: другие структуры данных не поддерживаются
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepCompare = (a: any, b: any) => {
  if (a === b) {
    return true;
  }

  if (a && b && a.constructor === b.constructor) {
    let constructor = a.constructor;
    let length = 0;

    if (constructor === Array) {
      if ((length = a.length) === b.length) {
        while (length-- && deepCompare(a[length], b[length]));
      }

      return length === -1;
    }

    if (constructor === Map) {
      if (a.size !== b.size) {
        return false;
      }

      for (const entries of a) {
        let key = entries[0];

        if (key && typeof key === 'object') {
          key = findMapKey(b, key);

          if (!key) {
            return false;
          }
        }

        if (!deepCompare(entries[1], b.get(key))) {
          return false;
        }
      }

      return true;
    }

    if (constructor === Set) {
      if (a.size !== b.size) {
        return false;
      }

      for (const entries of a) {
        let key = entries;

        if (key && typeof key === 'object') {
          key = findMapKey(b, key);

          if (!key) {
            return false;
          }
        }

        if (!b.has(key)) {
          return false;
        };
      }

      return true;
    }

    if (!constructor || typeof a === 'object') {
      length = 0;

      for (constructor in a) {
        if (
          Object.prototype.hasOwnProperty.call(a, constructor)
          && ++length
          && !Object.prototype.hasOwnProperty.call(b, constructor)
        )
          return false;
        if (!(constructor in b) || !deepCompare(a[constructor], b[constructor]))
          return false;
      }

      return Object.keys(b).length === length;
    }
  }

  return a !== a && b !== b;
};
