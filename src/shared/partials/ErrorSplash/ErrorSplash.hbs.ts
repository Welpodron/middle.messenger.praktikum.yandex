import classNames from "./ErrorSplash.module.scss";

export default `
<div class="centered ${classNames.splash}">
    <h1>{{title}}</h1>
    <p>{{message}}</p>
    {{> Link url="/messenger" text="Назад к чатам"}}
</div>
`;
