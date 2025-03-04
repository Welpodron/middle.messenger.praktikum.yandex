import classNames from "./Login.module.scss";

export default `
<main class="centered ${classNames.page}">
    <form method="POST" class="${classNames.form}">
        <h1>{{title}}</h1>
        {{> Input label="Логин" type="text" name="login" placeholder="ivanivanov" autocomplete="username" isRequired=true }}
        {{> Input label="Пароль" type="password" name="password" placeholder="**********" autocomplete="current-password" isRequired=true }}
        <div class="${classNames.actions}">
            {{> Button isFull=true type="submit" text="Авторизоваться" }}
            {{> Link url="/sign-up" text="Нет аккаунта?" }}
        </div>
    </form>
</main>
`;
