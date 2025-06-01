import type { TAwaitable } from '@app/types/utils';
import type { TQueryState } from '@modules/HTTPClient';

import { Router } from '@modules/Router';
import { Store } from '@modules/Store';
import { log } from '@utils/log';
import { uuid } from '@utils/uuid';

const UNKNOWN_ERROR_MESSAGE = 'Произошла неизвестная ошибка';

export type TTransactify<TQueryParams = unknown> = {
  queryParams: TQueryParams;
  onBeforeTransaction?: () => void;
  onAfterTransaction?: () => void;
  onSuccess?: () => void;
  onError?: (errorMessage: string) => void;
};

type TTransactifyParams<TQueryParams, TQueryData> = TTransactify<TQueryParams> & {
  query: (queryParams: TQueryParams) => TAwaitable<TQueryState<TQueryData>>;
  transaction?: ({ queryData, queryParams }: { queryData: TQueryData | undefined; queryParams: TQueryParams }) => TAwaitable<void>;
};

export const transactify = async <TQueryParams = unknown, TQueryData = unknown>({
  queryParams,
  query,
  transaction,
  onBeforeTransaction,
  onAfterTransaction,
  onSuccess,
  onError,
}: TTransactifyParams<TQueryParams, TQueryData>) => {
  try {
    onBeforeTransaction?.();

    const { data: queryData, error, unauthorized, aborted } = await query(queryParams);

    if (aborted) {
      return onAfterTransaction?.();
    }

    if (unauthorized) {
      return Router.redirect('/login');
    }

    if (error) {
      throw new Error(error ?? UNKNOWN_ERROR_MESSAGE);
    }

    if (transaction) {
      await transaction({ queryData, queryParams });
    }

    onSuccess?.();
  }
  catch (error) {
    if (onError) {
      if (error instanceof Error) {
        onError(error.message);
      }
      else {
        onError(UNKNOWN_ERROR_MESSAGE);
      }
    }
    else {
      log({
        type: 'error',
        message: error,
      });

      Store.set('alerts', [
        ...Store.get('alerts'),
        {
          id: uuid(),
          type: 'error',
          message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
        },
      ]);
    }
  }
  finally {
    onAfterTransaction?.();
  }
};
