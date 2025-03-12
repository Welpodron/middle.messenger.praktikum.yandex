import type { Button } from '@components/Button';
import type { FormFieldMessage } from '@components/FormFieldMessage';

import type { TFormProps } from '@components/Form';

export type TFormMessageState = {
  message: string;
};

export type TFormMessageProps = TFormProps<TFormMessageState>;

export type TFormMessageChildren = {
  InputMessage: FormFieldMessage;
  ButtonSend: Button;
};
