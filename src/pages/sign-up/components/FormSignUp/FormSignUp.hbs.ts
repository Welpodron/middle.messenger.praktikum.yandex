import classNames from './FormSignUp.module.scss';

export default `
<form class="${classNames.form}">
    <h1>{{title}}</h1>
    {{{InputEmail}}}
    {{{InputLogin}}}
    {{{InputFirstName}}}
    {{{InputSecondName}}}
    {{{InputPhone}}}
    {{{InputPassword}}}
    {{{InputPasswordRepeated}}}
    <div class="${classNames.actions}">
        {{{ButtonRegister}}}
        {{{ErrorText}}}
        {{{LinkLogin}}}
    </div>
</form>`;
