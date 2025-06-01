import type { TInputProps } from '../Input';
import type { TValidatableProps } from '../Validatable';

export type TFormFieldProps<TValue> = TValidatableProps<TValue> & TInputProps & {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
};
