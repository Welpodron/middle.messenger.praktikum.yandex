import type { HTTP_METHODS } from './constants';

export type TRequestOptions = {
  method?: HTTP_METHODS;
  // TODO: В целом можно подумать над дженериком чтобы знать значение data
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
};
