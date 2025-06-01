import type {
  TAuthenticateResponseData,
  TSignInRequestParams,
  TSignInResponseData,
  TSignUpRequestParams,
  TSignUpResponseData,
} from './types';

import { HTTPClient, query } from '@modules/HTTPClient';

export class AuthAPI {
  static ENTRYPOINT = '/auth';

  static signup(params: TSignUpRequestParams) {
    return query(() =>
      HTTPClient.post<TSignUpResponseData>(`${AuthAPI.ENTRYPOINT}/signup`, {
        data: params,
      }),
    );
  }

  static signin(params: TSignInRequestParams) {
    return query(() =>
      HTTPClient.post<TSignInResponseData>(`${AuthAPI.ENTRYPOINT}/signin`, {
        data: params,
      }),
    );
  }

  static authenticate() {
    return query(() =>
      HTTPClient.get<TAuthenticateResponseData>(`${AuthAPI.ENTRYPOINT}/user`),
    );
  }

  static logout() {
    return query(() => HTTPClient.post(`${AuthAPI.ENTRYPOINT}/logout`));
  }
}
