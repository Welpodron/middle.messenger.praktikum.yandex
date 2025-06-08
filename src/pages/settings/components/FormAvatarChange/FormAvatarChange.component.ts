import type {
  TFormAvatarChangeChildren,
  TFormAvatarChangeProps,
  TFormAvatarChangeState,
} from './types';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { FormFieldGeneric } from '@components/FormFieldGeneric';
import { COMMON_VALIDATIONS } from '@constants/validation';
import uploadIcon from '@icons/upload.svg?raw';

import template from './FormAvatarChange.hbs';

export class FormAvatarChange extends Form<
  TFormAvatarChangeState,
  TFormAvatarChangeProps,
  TFormAvatarChangeChildren
> {
  constructor(props: TFormAvatarChangeProps) {
    super({
      ...props,
      InputAvatar: new FormFieldGeneric({
        label: 'Аватар',
        name: 'avatar',
        type: 'file',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).files?.[0];

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.children.InputAvatar.validate();

          this.updateState(value ?? null, 'avatar');
        },
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
        accept: 'image/png, image/gif, image/jpeg, image/jpg, image/webp',
      }),
      ButtonChangeAvatar: new Button({
        type: 'submit',
        isFull: true,
        Children: ['Поменять аватар', uploadIcon],
      }),
    });
  }

  disable() {
    super.disable();

    this.children.ButtonChangeAvatar.setProps({
      isLoading: true,
    });
  }

  enable() {
    super.enable();

    this.children.ButtonChangeAvatar.setProps({
      isLoading: false,
    });
  }

  render() {
    return this.compile(template);
  }
}
