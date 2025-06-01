import type { TDynamicObject } from '@app/types/utils';
import type { TFormChildren, TFormProps } from './types';

import { Inputable } from '@components/Inputable';

import { Block } from '../Block';
import { ErrorText } from '../ErrorText';
import { Validatable } from '../Validatable';

export abstract class Form<
  TState extends TDynamicObject,
  TProps extends TFormProps<TState>,
  TChildren,
> extends Block<HTMLFormElement, TProps, TChildren & TFormChildren> {
  protected _isDisabled = false;
  protected _state: TState;

  constructor(props: TProps & TChildren) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();

          this.toggleError();

          if (this._isDisabled) {
            return;
          }

          if (!this.validate()) {
            return;
          }

          this._props.onSubmit(this._state);
        },
      },
      ErrorText: new ErrorText({
        error: props.error,
      }),
    });

    this._state = this._props.initialState ?? ({} as TState);
  }

  updateState<TKey extends keyof TState>(value: TState[TKey], field: TKey) {
    this.setState({
      ...this._state,
      [field]: value,
    });

    this.toggleError();
  }

  // Используется как default функция для апдейта state внутри onChange FormField, если нужен другой кейс, то переопределить в наследнике или же вообще не использовать
  updateStateFromEvent<TKey extends keyof TState>(event: Event, field: TKey) {
    const target = event.target as HTMLInputElement;

    this.updateState(target.value as TState[TKey], field);
  }

  setState(newState: TState) {
    this._state = newState;
  }

  validate() {
    return !Object.values(this.children).some(
      child => child instanceof Validatable && !child.validate(),
    );
  }

  reset() {
    this.setState(this._props.initialState ?? ({} as TState));

    Object.values(this.children).forEach((child) => {
      if (child instanceof Validatable) {
        child.reset();
        child.children.Input.reset();
      }

      if (child instanceof Inputable) {
        child.reset();
      }
    });

    this.toggleError();

    this.enable();
  }

  toggleError(message?: string) {
    this.children.ErrorText.setProps({
      error: message,
    });
  }

  disable() {
    this._isDisabled = true;
  }

  enable() {
    this._isDisabled = false;
  }
}
