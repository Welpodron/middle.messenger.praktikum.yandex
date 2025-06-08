import classNames from './UserConnector.module.scss';

export default `
<div class="${classNames.root}">
    {{#if state.user}}
        {{{ButtonAvatar}}}
        {{{FormInfoChange}}}
        {{{ButtonChangePassword}}}
        {{{ButtonLogout}}}
        {{{DrawerPasswordChange}}}
        {{{DrawerAvatarChange}}}
    {{else}}
        <p>Пользователь не найден :C</p>
    {{/if}}
</div>
`;
