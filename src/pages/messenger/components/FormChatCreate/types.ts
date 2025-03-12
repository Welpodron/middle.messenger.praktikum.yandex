import type { Button } from '@components/Button';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

import type { TFormProps } from '@components/Form';

export type TFormChatCreateState = {
  login: string;
};

export type TFormChatCreateProps = TFormProps<TFormChatCreateState>;

export type TFormChatCreateChildren = {
  FieldLogin: FormFieldGeneric;
  ButtonCreate: Button;
};
