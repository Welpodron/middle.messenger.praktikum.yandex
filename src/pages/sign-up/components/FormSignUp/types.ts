import type { Button } from '@components/Button';
import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';
import type { Link } from '@components/Link';

export type TFormSignUpState = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
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
  ButtonRegister: Button<string[]>;
  LinkLogin: Link<string>;
};
