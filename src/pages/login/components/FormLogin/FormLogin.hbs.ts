import classNames from './FormLogin.module.scss';

export default `
<form class="${classNames.form}">
    <h1>{{title}}</h1>
    {{{InputLogin}}}
    {{{InputPassword}}}
    <div class="${classNames.actions}">
        {{{ButtonAuth}}}
        {{{ErrorText}}}
        {{{LinkRegister}}}
    </div>
</form>`;
