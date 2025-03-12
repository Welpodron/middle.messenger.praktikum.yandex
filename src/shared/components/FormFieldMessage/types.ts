import type { TInputMessageProps } from '../InputMessage';
import type { TValidatableProps } from '../Validatable';
import type { Placeholder } from './components/Placeholder';

export type TFormFieldMessageProps<TValue> = TValidatableProps<TValue> & TInputMessageProps & {
  placeholder: string;
  inputClassName?: string;
};

export type TFormFieldMessageChildren = {
  Placeholder: Placeholder;
};
