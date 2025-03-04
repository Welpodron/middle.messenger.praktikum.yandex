import type {
  TFormPasswordChangeChildren,
  TFormPasswordChangeState,
  TFormPasswordChangeProps,
} from './types';

import { COMMON_VALIDATIONS } from '../../../../shared/constants/validation';

import { Form } from '../../../../shared/components/Form';
import { FormField } from '../../../../shared/components/FormField';
import { Button } from '../../../../shared/components/Button';

import template from './FormPasswordChange.hbs';

export class FormPasswordChange extends Form<
  TFormPasswordChangeState,
  TFormPasswordChangeProps,
  TFormPasswordChangeChildren
> {
  constructor(props: TFormPasswordChangeProps) {
    super({
      ...props,
      InputPassword: new FormField({
        label: 'Текущий пароль',
        type: 'password',
        name: 'password',
        placeholder: '**********',
        autocomplete: 'current-password',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            password: value,
          });
        },
        // ! Валидация на текущий пароль отсутствует из соображений возможности смены политики валидации для текущих пользователей или по какой-то причине пароль изменен на бэке
      }),
      InputNewPassword: new FormField({
        label: 'Новый пароль',
        type: 'password',
        name: 'new_password',
        placeholder: '**********',
        autocomplete: 'new-password',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            new_password: value,
          });
        },
        validation: COMMON_VALIDATIONS.NOT_EMPTY,
      }),
      InputNewPasswordRepeated: new FormField({
        label: 'Повторите новый пароль',
        type: 'password',
        name: 'new_password_repeated',
        placeholder: '**********',
        autocomplete: 'new-password',
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            new_password_repeated: value,
          });
        },
        validation: {
          test: (value: string) => value === this.state.new_password,
          message: 'Пароли не совпадают',
        },
      }),
      ButtonChangePassword: new Button({
        type: 'submit',
        isDanger: true,
        isFull: true,
        Children: 'Сменить пароль',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
