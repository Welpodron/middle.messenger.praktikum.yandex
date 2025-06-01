import type { TAwaitable } from '@app/types/utils';

import { isAbortError } from '../isAbortError';
import { isHTTPClientError } from '../isHTTPClientError';
import { isUnauthorizedError } from '../isUnauthorizedError';

const UNKNOWN_ERROR_MESSAGE = 'Неизвестная ошибка';

export type TQueryState<TQueryData> = {
  data: TQueryData | undefined;
  error: string | undefined;
  aborted?: boolean;
  unauthorized?: boolean;
  successful?: boolean;
};

// TODO: Добавить локальное замыкание с abort контроллером, чтобы старая query автоматом прерывалась при новом вызове
export const query = async <TQueryData = unknown>(
  queryFn: () => TAwaitable<TQueryData>,
) => {
  const state: TQueryState<TQueryData> = {
    data: undefined,
    error: undefined,
  };

  try {
    state.data = await queryFn();
    state.successful = true;
  }
  catch (error) {
    if (!isAbortError(error)) {
      if (isUnauthorizedError(error)) {
        state.unauthorized = true;
      }
      else if (isHTTPClientError(error)) {
        state.error = error.message || UNKNOWN_ERROR_MESSAGE;
      }
      else {
        state.error = error instanceof Error
          ? error.message || UNKNOWN_ERROR_MESSAGE
          : UNKNOWN_ERROR_MESSAGE;
      }
    }
    else {
      state.aborted = true;
    }

    state.successful = false;
  }

  return state;
};
