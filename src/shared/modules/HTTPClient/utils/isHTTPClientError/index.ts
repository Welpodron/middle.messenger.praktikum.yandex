import { HTTPClientError } from '../../errors/HTTPClientError';

export const isHTTPClientError = (error: unknown): error is HTTPClientError => {
  return error instanceof HTTPClientError;
};
