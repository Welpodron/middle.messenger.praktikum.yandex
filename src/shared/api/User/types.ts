import type { TUser } from '@app/types/api';

export type TChangeInfoRequestParams = Omit<TUser, 'id' | 'avatar'>;
export type TChangeInfoResponseData = TUser;

export type TChangeAvatarRequestParams = FormData;
export type TChangeAvatarResponseData = TUser;

export type TChangePasswordRequestParams = {
  oldPassword: string;
  newPassword: string;
};
export type TChangePasswordResponseData = void;
