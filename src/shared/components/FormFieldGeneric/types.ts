import type { TValidatableProps } from '../Validatable';
import type { TInputProps } from '../Input';

export type TFormFieldProps<TValue> = TValidatableProps<TValue> & TInputProps & {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
};
