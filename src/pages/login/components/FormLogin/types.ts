import type { Button } from '@components/Button';
import type { Link } from '@components/Link';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

import type { TFormProps } from '@components/Form';

export type TFormLoginState = {
  login: string;
  password: string;
};

export type TFormLoginProps = TFormProps<TFormLoginState> & {
  title: string;
};

export type TFormLoginChildren = {
  FieldLogin: FormFieldGeneric;
  FieldPassword: FormFieldGeneric;
  ButtonAuth: Button;
  LinkRegister: Link;
};
