import type { TEventHandler } from '../../types/utils';

export type TInputMessageProps = {
  className?: string;
  onBlur?: TEventHandler<FocusEvent>;
  onInput?: TEventHandler<InputEvent>;
  onEnter?: TEventHandler<KeyboardEvent>;
};
