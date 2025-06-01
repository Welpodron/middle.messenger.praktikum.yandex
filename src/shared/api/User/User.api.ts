import type {
  TChangeAvatarRequestParams,
  TChangeAvatarResponseData,
  TChangeInfoRequestParams,
  TChangeInfoResponseData,
  TChangePasswordRequestParams,
  TChangePasswordResponseData,
} from './types';

import { HTTPClient, query } from '@modules/HTTPClient';

export class UserAPI {
  static ENTRYPOINT = '/user';

  static changeInfo(params: TChangeInfoRequestParams) {
    return query(() =>
      HTTPClient.put<TChangeInfoResponseData>(`${this.ENTRYPOINT}/profile`, {
        data: params,
      }),
    );
  }

  static changePassword(params: TChangePasswordRequestParams) {
    return query(() =>
      HTTPClient.put<TChangePasswordResponseData>(
        `${this.ENTRYPOINT}/password`,
        {
          data: params,
        },
      ),
    );
  }

  static changeAvatar(params: TChangeAvatarRequestParams) {
    return query(() =>
      HTTPClient.put<TChangeAvatarResponseData>(
        `${this.ENTRYPOINT}/profile/avatar`,
        {
          data: params,
        },
      ),
    );
  }
}
