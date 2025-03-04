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

    if (!constructor || typeof a === 'object') {
      length = 0;

      for (constructor in a) {
        if (Object.prototype.hasOwnProperty.call(a, constructor) && ++length && !Object.prototype.hasOwnProperty.call(b, constructor)) return false;
        if (!(constructor in b) || !deepCompare(a[constructor], b[constructor])) return false;
      }

      return Object.keys(b).length === length;
    }
  }

  return a !== a && b !== b;
};
