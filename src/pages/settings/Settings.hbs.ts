// TODO: Отрефачить в некст спринтах добавив поддержку модалок и тд и тп

import chevronLeftSvg from "../../shared/icons/chevron-left.svg?raw";

import classNames from "./Settings.module.scss";

export default `
<main class="${classNames.page}">
    <h1 class="sr-only">{{title}}</h1>
    {{#> Link url="/messenger" className="centered ${classNames.link}" }}
        ${chevronLeftSvg}
    {{/ Link }}
    <section class="centered">
        <form method="POST" class="${classNames.form}">
            {{#> Button type="button" isRound=true className="${classNames.avatarButton}" }}
                {{> Avatar isLarge=true picture=user.avatar }}
            {{/ Button }}
            <h2>{{user.display_name}}</h2>
            {{> Input value=user.email label="Почта" type="email" name="email" placeholder="pochta@yandex.ru" autocomplete="email" isRequired=true }}
            {{> Input value=user.login label="Логин" type="text" name="login" placeholder="ivanivanov" autocomplete="username" isRequired=true }}
            {{> Input value=user.first_name label="Имя" type="text" name="first_name" placeholder="Иван" autocomplete="given-name" }}
            {{> Input value=user.second_name label="Фамилия" type="text" name="second_name" placeholder="Иванов" autocomplete="family-name" }}
            {{> Input value=user.display_name label="Имя в чате" type="text" name="display_name" placeholder="Иван" autocomplete="nickname" }}
            {{> Input value=user.phone label="Телефон" type="text" name="phone" placeholder="+7 (909) 967 30 30" autocomplete="tel" isRequired=true }}
            <div class="${classNames.actions}">
                {{> Button type="submit" text="Изменить данные" }}
                {{> Button type="button" text="Изменить пароль" }}
                {{> Button isDanger=true type="button" text="Выйти" }}
            </div>
        </form>
        <div hidden>
            <form method="POST">
                {{> Input label="Старый пароль" type="password" name="oldPassword" placeholder="**********" autocomplete="new-password" isRequired=true }}
                {{> Input label="Новый пароль" type="password" name="newPassword" placeholder="**********" autocomplete="new-password" isRequired=true }}
                {{> Input label="Повторите новый пароль" type="password" name="newPasswordRepeated" placeholder="**********" autocomplete="new-password" isRequired=true }}
                <div>
                    {{> Button type="submit" text="Изменить пароль" }}
                    {{> Button type="button" text="Отмена" }}
                </div>
            </form>
        </div>
        <div hidden>
            <form method="POST">
                {{> Input label="Аватар" type="file" name="avatar" isRequired=true }}
                <div>
                    {{> Button type="submit" text="Поменять" }}
                    {{> Button type="button" text="Отмена" }}
                </div>
            </form>
        </div>
    </section>
</main>
`;
