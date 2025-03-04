import type {
  TFormInfoChangeChildren,
  TFormInfoChangeState,
  TFormInfoChangeProps,
} from './types';

import { COMMON_VALIDATIONS } from '../../../../shared/constants/validation';

import { Form } from '../../../../shared/components/Form';
import { FormField } from '../../../../shared/components/FormField';
import { Button } from '../../../../shared/components/Button';
import { Avatar } from '../../../../shared/components/Avatar';

import classNames from './FormInfoChange.module.scss';

import template from './FormInfoChange.hbs';

export class FormInfoChange extends Form<
  TFormInfoChangeState,
  TFormInfoChangeProps,
  TFormInfoChangeChildren
> {
  constructor(props: TFormInfoChangeProps) {
    super({
      ...props,
      ButtonAvatar: new Button({
        type: 'button',
        isRound: true,
        className: classNames.avatarButton,
        onClick: props.onAvatarChangeClick,
        Children: new Avatar({
          isLarge: true,
          picture: props.currentUser.picture,
        }),
      }),
      InputEmail: new FormField({
        label: 'Почта',
        name: 'email',
        type: 'email',
        placeholder: 'pochta@yandex.ru',
        autocomplete: 'email',
        value: props.initialState.email,
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            email: value,
          });
        },
        validation: COMMON_VALIDATIONS.email,
      }),
      InputLogin: new FormField({
        label: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'ivanivanov',
        autocomplete: 'username',
        value: props.initialState.login,
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            login: value,
          });
        },
        validation: COMMON_VALIDATIONS.login,
      }),
      InputFirstName: new FormField({
        label: 'Имя',
        name: 'first_name',
        type: 'text',
        placeholder: 'Иван',
        autocomplete: 'given-name',
        value: props.initialState.first_name,
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            first_name: value,
          });
        },
        validation: COMMON_VALIDATIONS.names,
      }),
      InputSecondName: new FormField({
        label: 'Фамилия',
        name: 'second_name',
        type: 'text',
        placeholder: 'Иванов',
        autocomplete: 'family-name',
        value: props.initialState.second_name,
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            second_name: value,
          });
        },
        validation: COMMON_VALIDATIONS.names,
      }),
      InputDisplayName: new FormField({
        label: 'Имя в чате',
        name: 'display_name',
        type: 'text',
        placeholder: 'Иван',
        autocomplete: 'username',
        value: props.initialState.display_name,
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            display_name: value,
          });
        },
      }),
      InputPhone: new FormField({
        label: 'Телефон',
        name: 'phone',
        type: 'text',
        placeholder: '+7 (909) 967 30 30',
        autocomplete: 'tel',
        value: props.initialState.phone,
        onChange: (event: Event) => {
          const value = (event.target as HTMLInputElement).value;

          this.children.ErrorText.setProps({
            error: undefined,
          });

          this.setState({
            ...this.state,
            phone: value,
          });
        },
        validation: COMMON_VALIDATIONS.phone,
      }),
      ButtonChangeData: new Button({
        type: 'submit',
        Children: 'Изменить данные',
      }),
      ButtonChangePassword: new Button({
        type: 'button',
        onClick: props.onPasswordChangeClick,
        Children: 'Изменить пароль',
      }),
      ButtonLogout: new Button({
        type: 'button',
        isDanger: true,
        Children: 'Выйти',
      }),
    });
  }

  render() {
    return this.compile(template);
  }
}
