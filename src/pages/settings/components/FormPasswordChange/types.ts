import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';
import type { Button } from '@components/Button';

export type TFormPasswordChangeState = {
  password: string;
  new_password: string;
  new_password_repeated: string;
};

export type TFormPasswordChangeProps = TFormProps<TFormPasswordChangeState>;

export type TFormPasswordChangeChildren = {
  FieldPassword: FormFieldGeneric;
  FieldNewPassword: FormFieldGeneric;
  FieldNewPasswordRepeated: FormFieldGeneric;
  ButtonChangePassword: Button;
};
