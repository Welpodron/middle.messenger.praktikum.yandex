import classNames from './FormInfoChange.module.scss';

export default `
<form class="${classNames.form}">
    {{{ButtonAvatar}}}
    <h2>
        {{#if currentUser.display_name}}
            {{currentUser.display_name}}
        {{else}}
            {{currentUser.login}}
        {{/if}}
    </h2>
    {{{FieldEmail}}}
    {{{FieldLogin}}}
    {{{FieldFirstName}}}
    {{{FieldSecondName}}}
    {{{FieldDisplayName}}}
    {{{FieldPhone}}}
    <div class="${classNames.actions}">
        {{{ErrorText}}}
        {{{ButtonChangeData}}}
        {{{ButtonChangePassword}}}
        {{{ButtonLogout}}}
    </div>
</form>
`;
