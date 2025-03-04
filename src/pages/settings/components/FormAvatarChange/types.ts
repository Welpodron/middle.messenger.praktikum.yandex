import type { TFormProps } from '../../../../shared/components/Form';
import type { FormField } from '../../../../shared/components/FormField';
import type { Button } from '../../../../shared/components/Button';

export type TFormAvatarChangeState = {
  // TODO: Пока не понятно в каком формате нужно будет отправлять файл на сервер
  avatar: File | null;
};

export type TFormAvatarChangeProps = TFormProps<TFormAvatarChangeState>;

export type TFormAvatarChangeChildren = {
  // TODO: Добавить в некст спринте InputFile с поддержкой drag-n-drop + превью и загрузка по ссылке
  // TODO: Обновить стилизацию такого инпута
  InputAvatar: FormField;
  ButtonChangeAvatar: Button;
};
