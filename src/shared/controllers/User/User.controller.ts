import type {
  TChangeAvatarRequestParams,
  TChangeInfoRequestParams,
  TChangePasswordRequestParams,
} from '@api/User';
import type { TTransactify } from '@modules/Transaction';

import { UserAPI } from '@api/User';
import { Store } from '@modules/Store';
import { transactify } from '@modules/Transaction';
import { uuid } from '@utils/uuid';

class _UserController {
  changeInfo({
    queryParams,
    onBeforeTransaction,
    onAfterTransaction,
    onSuccess,
    onError,
  }: TTransactify<TChangeInfoRequestParams>) {
    transactify({
      queryParams,
      query: queryParams => UserAPI.changeInfo(queryParams),
      transaction: ({ queryData }) => {
        if (!queryData) {
          return;
        }

        Store.set('user', queryData);

        Store.set('alerts', [
          ...Store.get('alerts'),
          {
            id: uuid(),
            type: 'success',
            message: 'Данные успешно изменены',
          },
        ]);
      },
      onBeforeTransaction,
      onAfterTransaction,
      onSuccess,
      onError,
    });
  }

  uploadAvatar({
    queryParams,
    onBeforeTransaction,
    onAfterTransaction,
    onSuccess,
    onError,
  }: TTransactify<TChangeAvatarRequestParams>) {
    transactify({
      queryParams,
      query: queryParams => UserAPI.changeAvatar(queryParams),
      transaction: ({ queryData }) => {
        if (!queryData) {
          return;
        }

        Store.set('user', queryData);

        Store.set('alerts', [
          ...Store.get('alerts'),
          {
            id: uuid(),
            type: 'success',
            message: 'Данные успешно изменены',
          },
        ]);
      },
      onBeforeTransaction,
      onAfterTransaction,
      onSuccess,
      onError,
    });
  }

  changePassword({
    queryParams,
    onBeforeTransaction,
    onAfterTransaction,
    onSuccess,
    onError,
  }: TTransactify<TChangePasswordRequestParams>) {
    transactify({
      queryParams,
      query: queryParams => UserAPI.changePassword(queryParams),
      transaction: () => {
        Store.set('alerts', [
          ...Store.get('alerts'),
          {
            id: uuid(),
            type: 'success',
            message: 'Данные успешно изменены',
          },
        ]);
      },
      onBeforeTransaction,
      onAfterTransaction,
      onSuccess,
      onError,
    });
  }
}

export const UserController = new _UserController();
