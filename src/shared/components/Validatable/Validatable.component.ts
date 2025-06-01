import type { TBlockChildren, TBlockOptions } from '../Block';
import type { Inputable } from '../Inputable';
import type { TValidatableChildren, TValidatableProps } from './types';

import { Block } from '../Block';
import { ErrorText } from '../ErrorText';

export abstract class Validatable<
  TValue,
  TInput extends Inputable,
  TRootElement extends Element,
  TProps extends TValidatableProps<TValue>,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  TChildren extends TBlockChildren = {},
> extends Block<
    TRootElement,
    TProps,
  TChildren & TValidatableChildren<TInput>
  > {
  constructor(
    props: TProps & TChildren & Pick<TValidatableChildren<TInput>, 'Input'>,
    options?: TBlockOptions,
  ) {
    super(
      {
        ...props,
        ErrorText: new ErrorText(
          {
            error: props.error,
          },
          options?.displayName
            ? { displayName: `${options.displayName}ErrorText` }
            : undefined,
        ),
      },
      options,
    );
  }

  reset() {
    this.children.ErrorText.setProps({
      error: undefined,
    });
  }

  validate() {
    if (!this._props.validation) {
      return true;
    }

    const { test, message } = this._props.validation;

    if (!test(this.children.Input.value as unknown as TValue)) {
      this.children.ErrorText.setProps({
        error: message,
      });

      return false;
    }

    this.children.ErrorText.setProps({
      error: undefined,
    });

    return true;
  }
}
