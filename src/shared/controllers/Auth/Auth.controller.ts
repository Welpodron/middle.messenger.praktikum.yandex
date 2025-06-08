import type {
  TSignInRequestParams,
  TSignUpRequestParams } from '@api/Auth';
import type { TTransactify } from '@modules/Transaction';

import {
  AuthAPI,
} from '@api/Auth';
import { Router } from '@modules/Router';
import { Store } from '@modules/Store';
import { transactify } from '@modules/Transaction';

class _AuthController {
  signup({ queryParams, onBeforeTransaction, onError }: TTransactify<TSignUpRequestParams>) {
    transactify({
      queryParams,
      query: async (queryParams) => {
        const { successful, error } = await AuthAPI.signup(queryParams);

        if (!successful || error) {
          throw new Error(error ?? 'Неизвестная ошибка при регистрации');
        }

        return AuthAPI.authenticate();
      },
      transaction: ({ queryData }) => {
        Store.set('user', queryData);
      },
      onBeforeTransaction,
      onSuccess: () => {
        Router.go('/messenger');
      },
      onError,
    });
  }

  signin({ queryParams, onBeforeTransaction, onError }: TTransactify<TSignInRequestParams>) {
    transactify({
      queryParams,
      query: async (queryParams) => {
        const { successful, error } = await AuthAPI.signin(queryParams);

        if (!successful || error) {
          throw new Error(error ?? 'Неизвестная ошибка при авторизации');
        }

        return AuthAPI.authenticate();
      },
      transaction: ({ queryData }) => {
        Store.set('user', queryData);
      },
      onBeforeTransaction,
      onSuccess: () => {
        Router.go('/messenger');
      },
      onError,
    });
  }

  logout({ onBeforeTransaction, onError }: TTransactify<undefined>) {
    transactify({
      queryParams: undefined,
      query: () => AuthAPI.logout(),
      onBeforeTransaction,
      transaction: () => {
        Store.reset();
      },
      onSuccess: () => {
        Router.redirect('/login');
      },
      onError,
    });
  }

  // Особая функция для render методов routа без транзакции
  async authenticate() {
    try {
      const { data, successful } = await AuthAPI.authenticate();

      if (!data || !successful) {
        return false;
      }

      Store.set('user', data);

      return true;
    }
    catch {
      return false;
    }
  }
}

export const AuthController = new _AuthController();
