import type { Button } from '@components/Button';
import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

export type TFormPasswordChangeState = {
  oldPassword: string;
  newPassword: string;
};

export type TFormPasswordChangeProps = TFormProps<TFormPasswordChangeState>;

export type TFormPasswordChangeChildren = {
  FieldOldPassword: FormFieldGeneric;
  FieldNewPassword: FormFieldGeneric;
  ButtonChangePassword: Button<string[]>;
};
