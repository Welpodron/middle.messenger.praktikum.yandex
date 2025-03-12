import type { Button } from '@components/Button';
import type { Link } from '@components/Link';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

import type { TFormProps } from '@components/Form';

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
  FieldEmail: FormFieldGeneric;
  FieldLogin: FormFieldGeneric;
  FieldFirstName: FormFieldGeneric;
  FieldSecondName: FormFieldGeneric;
  FieldPhone: FormFieldGeneric;
  FieldPassword: FormFieldGeneric;
  FieldPasswordRepeated: FormFieldGeneric;
  ButtonRegister: Button;
  LinkLogin: Link;
};
