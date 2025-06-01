import type { HelperOptions } from 'handlebars';

export function isEqual(this: unknown, a: unknown, b: unknown, options: HelperOptions) {
  return Object.is(a, b) ? options.fn(this) : options.inverse(this);
}
