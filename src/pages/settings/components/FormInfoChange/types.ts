import type { TUser } from '@app/types/api';

import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';
import type { Button } from '@components/Button';

export type TFormInfoChangeState = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

export type TFormInfoChangeProps = TFormProps<TFormInfoChangeState> & {
  currentUser: TUser;
  onPasswordChangeClick: () => void;
  onAvatarChangeClick: () => void;
};

export type TFormInfoChangeChildren = {
  ButtonAvatar: Button;
  FieldEmail: FormFieldGeneric;
  FieldLogin: FormFieldGeneric;
  FieldFirstName: FormFieldGeneric;
  FieldSecondName: FormFieldGeneric;
  FieldDisplayName: FormFieldGeneric;
  FieldPhone: FormFieldGeneric;
  ButtonChangeData: Button;
  ButtonChangePassword: Button;
  ButtonLogout: Button;
};
