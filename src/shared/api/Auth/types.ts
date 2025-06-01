//

import type { TUser } from '@app/types/api';

export type TSignInRequestParams = {
  login: string;
  password: string;
};

export type TSignInResponseData = void;

//

export type TSignUpRequestParams = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignUpResponseData = {
  id: number;
};

export type TAuthenticateResponseData = TUser;
