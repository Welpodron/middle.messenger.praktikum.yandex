import type { Button } from '../../../../shared/components/Button';
import type { FormField } from '../../../../shared/components/FormField';

import type { TFormProps } from '../../../../shared/components/Form';

export type TFormChatCreateState = {
  login: string;
};

export type TFormChatCreateProps = TFormProps<TFormChatCreateState>;

export type TFormChatCreateChildren = {
  InputLogin: FormField;
  ButtonCreate: Button;
};
