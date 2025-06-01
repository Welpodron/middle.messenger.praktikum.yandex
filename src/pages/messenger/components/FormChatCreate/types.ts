import type { Button } from '@components/Button';
import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

export type TFormChatCreateState = {
  title: string;
};

export type TFormChatCreateProps = TFormProps<TFormChatCreateState>;

export type TFormChatCreateChildren = {
  FieldTitle: FormFieldGeneric;
  ButtonCreate: Button<string[]>;
};
