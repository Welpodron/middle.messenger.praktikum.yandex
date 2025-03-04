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
    {{{InputEmail}}}
    {{{InputLogin}}}
    {{{InputFirstName}}}
    {{{InputSecondName}}}
    {{{InputDisplayName}}}
    {{{InputPhone}}}
    <div class="${classNames.actions}">
        {{{ErrorText}}}
        {{{ButtonChangeData}}}
        {{{ButtonChangePassword}}}
        {{{ButtonLogout}}}
    </div>
</form>
`;
