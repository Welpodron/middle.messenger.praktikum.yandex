import classNames from './FormSignUp.module.scss';

export default `
<form class="${classNames.form}">
    <h1>{{title}}</h1>
    {{{FieldEmail}}}
    {{{FieldLogin}}}
    {{{FieldFirstName}}}
    {{{FieldSecondName}}}
    {{{FieldPhone}}}
    {{{FieldPassword}}}
    {{{FieldPasswordRepeated}}}
    <div class="${classNames.actions}">
        {{{ButtonRegister}}}
        {{{ErrorText}}}
        {{{LinkLogin}}}
    </div>
</form>`;
