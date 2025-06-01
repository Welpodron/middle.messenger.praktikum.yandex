import type { Button } from '@components/Button';
import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

export type TFormChatMessageState = {
  message: string;
};

export type TFormChatMessageProps = TFormProps<TFormChatMessageState>;

export type TFormChatMessageChildren = {
  FieldTitle: FormFieldGeneric;
  ButtonSend: Button<string>;
};
