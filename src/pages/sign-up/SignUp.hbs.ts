import classNames from "./SignUp.module.scss";

export default `
<main class="${classNames.page}">
    <form class="${classNames.form}">
        <h1>{{title}}</h1>
        {{> Input label="Почта" type="email" name="email" placeholder="pochta@yandex.ru" autocomplete="email" isRequired=true }}
        {{> Input label="Логин" type="text" name="login" placeholder="ivanivanov" autocomplete="username" isRequired=true }}
        {{> Input label="Имя" type="text" name="first_name" placeholder="Иван" autocomplete="given-name" }}
        {{> Input label="Фамилия" type="text" name="second_name" placeholder="Иванов" autocomplete="family-name" }}
        {{> Input label="Телефон" type="text" name="phone" placeholder="+7 (909) 967 30 30" autocomplete="tel" isRequired=true }}
        {{> Input label="Пароль" type="password" name="password" placeholder="**********" autocomplete="new-password" isRequired=true }}
        {{> Input label="Пароль (ещё раз)" type="password" name="password_repeated" placeholder="**********" autocomplete="new-password" isRequired=true }}
        <div class="${classNames.actions}">
            {{> Button isFull=true type="submit" text="Зарегистрироваться" }}
            {{> Link url="/login" text="Войти" }}
        </div>
    </form>
</main>
`;
