import { HTTP_STATUS } from '../../constants';
import { isHTTPClientError } from '../isHTTPClientError';

export const isUnauthorizedError = (error: unknown) => {
  if (!isHTTPClientError(error)) {
    return false;
  }

  return error.code === HTTP_STATUS.UNAUTHORIZED;
};
