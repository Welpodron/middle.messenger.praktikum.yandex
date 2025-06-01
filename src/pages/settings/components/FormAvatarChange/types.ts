import type { Button } from '@components/Button';
import type { TFormProps } from '@components/Form';
import type { FormFieldGeneric } from '@components/FormFieldGeneric';

export type TFormAvatarChangeState = {
  // TODO: Пока не понятно в каком формате нужно будет отправлять файл на сервер
  avatar: File | null;
};

export type TFormAvatarChangeProps = TFormProps<TFormAvatarChangeState>;

export type TFormAvatarChangeChildren = {
  // TODO: Добавить в некст спринте InputFile с поддержкой drag-n-drop + превью и загрузка по ссылке
  // TODO: Обновить стилизацию такого инпута
  InputAvatar: FormFieldGeneric;
  ButtonChangeAvatar: Button<string[]>;
};
