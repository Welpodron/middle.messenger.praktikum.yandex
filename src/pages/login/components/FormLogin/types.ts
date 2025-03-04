import type { Button } from '../../../../shared/components/Button';
import type { Link } from '../../../../shared/components/Link';
import type { FormField } from '../../../../shared/components/FormField';

import type { TFormProps } from '../../../../shared/components/Form';

export type TFormLoginState = {
  login: string;
  password: string;
};

export type TFormLoginProps = TFormProps<TFormLoginState> & {
  title: string;
};

export type TFormLoginChildren = {
  InputLogin: FormField;
  InputPassword: FormField;
  ButtonAuth: Button;
  LinkRegister: Link;
};
