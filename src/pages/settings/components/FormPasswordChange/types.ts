import type { TFormProps } from '../../../../shared/components/Form';
import type { FormField } from '../../../../shared/components/FormField';
import type { Button } from '../../../../shared/components/Button';

export type TFormPasswordChangeState = {
  password: string;
  new_password: string;
  new_password_repeated: string;
};

export type TFormPasswordChangeProps = TFormProps<TFormPasswordChangeState>;

export type TFormPasswordChangeChildren = {
  InputPassword: FormField;
  InputNewPassword: FormField;
  InputNewPasswordRepeated: FormField;
  ButtonChangePassword: Button;
};
