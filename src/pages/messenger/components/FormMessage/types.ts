import type { Button } from '../../../../shared/components/Button';
import type { FormField } from '../../../../shared/components/FormField';

import type { TFormProps } from '../../../../shared/components/Form';

export type TFormMessageState = {
  message: string;
};

export type TFormMessageProps = TFormProps<TFormMessageState>;

export type TFormMessageChildren = {
  InputMessage: FormField;
  ButtonSend: Button;
};
