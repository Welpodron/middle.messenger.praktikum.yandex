import type { Button } from '../../../../shared/components/Button';
import type { Link } from '../../../../shared/components/Link';
import type { FormField } from '../../../../shared/components/FormField';

import type { TFormProps } from '../../../../shared/components/Form';

export type TFormSignUpState = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  password_repeated: string;
};

export type TFormSignUpProps = TFormProps<TFormSignUpState> & {
  title: string;
};

export type TFormSignUpChildren = {
  InputEmail: FormField;
  InputLogin: FormField;
  InputFirstName: FormField;
  InputSecondName: FormField;
  InputPhone: FormField;
  InputPassword: FormField;
  InputPasswordRepeated: FormField;
  ButtonRegister: Button;
  LinkLogin: Link;
};
