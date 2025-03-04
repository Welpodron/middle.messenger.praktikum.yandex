import type { TUser } from '../../../../shared/types/api';

import type { TFormProps } from '../../../../shared/components/Form';
import type { FormField } from '../../../../shared/components/FormField';
import type { Button } from '../../../../shared/components/Button';

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
  InputEmail: FormField;
  InputLogin: FormField;
  InputFirstName: FormField;
  InputSecondName: FormField;
  InputDisplayName: FormField;
  InputPhone: FormField;
  ButtonChangeData: Button;
  ButtonChangePassword: Button;
  ButtonLogout: Button;
};
