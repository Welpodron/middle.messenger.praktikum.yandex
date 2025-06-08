import type { HelperOptions } from 'handlebars';

import Handlebars from 'handlebars';

export function trim(this: unknown, options: HelperOptions) {
  const text = Handlebars.escapeExpression(options.fn(this));
  return new Handlebars.SafeString(text.replace(/\s\s+/g, ' ').trim());
}
