import type { TDynamicObject } from '@app/types/utils';

import { Block } from '../Block';
import { ErrorText } from '../ErrorText';
import { Validatable } from '../Validatable';

import type { TFormProps, TFormChildren } from './types';

export abstract class Form<
  TState extends TDynamicObject,
  TProps extends TFormProps<TState>,
  TChildren,
> extends Block<HTMLFormElement, TProps, TChildren & TFormChildren> {
  // ref аналог
  isDisabled = false;

  // НЕ реактивное состояние формы (ref аналог), которое будет передано в onSubmit и просто хранит в себе значения полей формы, чтобы не передавать рефы input элементам, позволяет НЕ ререндерить вообще всю форму при изменении одного поля, аналог uncontrolled полей в реакте
  // TODO: В целом можно не делать это поле, а в onSubmit передавать FormData???
  // TODO: В случае если все же делать state реактивным, то нужно подумать что делать с внутренними элементами, так как чендж такого стейта полностью перерендерит шаблон hbs и элементы будут заменены с их event listeners
  state: TState;

  constructor(props: TProps & TChildren) {
    super({
      ...props,
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();

          if (this.isDisabled) {
            return;
          }

          if (!this.validate()) {
            return;
          }

          this.disable();

          await this.props.onSubmit(this.state);

          this.enable();
        },
      },
      ErrorText: new ErrorText({
        error: props.error,
      }),
    });

    this.state = this.props.initialState ?? ({} as TState);
  }

  updateState<TKey extends keyof TState>(value: TState[TKey], field: TKey) {
    this.setState({
      ...this.state,
      [field]: value,
    });
  }

  // Используется как default функция для апдейта state внутри onChange FormField, если нужен другой кейс, то переопределить в наследнике или же вообще не использовать
  updateStateFromEvent<TKey extends keyof TState>(event: Event, field: TKey) {
    const target = event.target as HTMLInputElement;

    this.updateState(target.value as TState[TKey], field);
  }

  setState(newState: TState) {
    this.state = newState;
  }

  validate() {
    return !Object.values(this.children).some(
      child => child instanceof Validatable && !child.validate(),
    );
  }

  toggleError(message?: string) {
    this.children.ErrorText.setProps({
      error: message,
    });
  }

  disable() {
    this.isDisabled = true;
  }

  enable() {
    this.isDisabled = false;
  }
}
