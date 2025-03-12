import type { TEventHandler } from '../../types/utils';

export type TInputProps = {
  className?: string;
  type:
    | 'email'
    | 'hidden'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'file'
    | (string & {});
  name: string;
  value?: string;
  autocomplete?: AutoFill;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadonly?: boolean;
  onBlur?: TEventHandler<FocusEvent>;
  onInput?: TEventHandler<InputEvent>;
  onChange?: TEventHandler<Event>;
};
