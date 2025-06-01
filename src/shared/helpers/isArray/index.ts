import type { HelperOptions } from 'handlebars';

export function isArray(this: unknown, conditional: unknown, options: HelperOptions) {
  return Array.isArray(conditional) ? options.fn(this) : options.inverse(this);
}
