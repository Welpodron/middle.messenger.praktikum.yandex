import type {
  TFormAvatarChangeChildren,
  TFormAvatarChangeState,
  TFormAvatarChangeProps,
} from './types';

import { COMMON_VALIDATIONS } from '../../../../shared/constants/validation';

import { Form } from '../../../../shared/components/Form';
import { FormField } from '../../../../shared/components/FormField';
import { Button } from '../../../../shared/components/Button';

import template from './FormAvatarChange.hbs';

export class FormAvatarChange extends Form<
  TFormAvatarChangeState,
  TFormAvatarChangeProps,
  TFormAvatarChangeChildren
> {
  constructor(props: TFormAvatarChangeProps) {
    super({
      ...props,
      InputAvatar: new FormField({
        label: 'Аватар',
        name: 'avatar',
        type: 'file',
        onChange: (event: Event) => {
          // TODO: Пока не понятно в каком формате нужно будет отправлять файл на сервер, чекнуть контракты бэка в некст спринтах
          const value = (event.target as HTMLInputElement).files?.[0];

          this.children.ErrorText.setProps({
            error: undefined,
          });

          if (value) {
            this.setState({
              ...this.state,
              avatar: value,
            });
          }
        },
        // TODO: Пока не понятно есть ли ограничения на размер файла и тип файла, чекнуть контракты бэка в некст спринтах
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      ButtonChangeAvatar: new Button({
        type: 'submit',
        Children: 'Поменять аватар',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
