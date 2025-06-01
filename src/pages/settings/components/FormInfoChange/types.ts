import type { TUser } from '@app/types/api';
import type { Button } from '@components/Button';
import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

export type TFormInfoChangeState = Omit<TUser, 'id' | 'avatar'>;

export type TFormInfoChangeProps = TFormProps<TFormInfoChangeState> & {
  user?: TUser;
};

export type TFormInfoChangeChildren = {
  FieldEmail: FormFieldGeneric;
  FieldLogin: FormFieldGeneric;
  FieldFirstName: FormFieldGeneric;
  FieldSecondName: FormFieldGeneric;
  FieldDisplayName: FormFieldGeneric;
  FieldPhone: FormFieldGeneric;
  ButtonChangeInfo: Button<string[]>;
};
