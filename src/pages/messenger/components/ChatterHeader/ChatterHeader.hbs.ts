import classNames from './ChatterHeader.module.scss';

export default `
<div class="${classNames.header}">
    <div class="${classNames.info}">
        {{{AvatarChat}}}
        <div class="${classNames.infoText}">
            <span class="${classNames.title}">
                {{chat.title}}
            </span>
            <span class="${classNames.meta}">
                ID: {{chat.id}}
            </span>
        </div>
    </div>
    {{#isEqual chat.created_by user.id}}
        <div>
            {{{ButtonChatActions}}}
        </div>
        {{{DrawerChatActions}}}
        {{{DrawerChatUsersAdd}}}
        {{{DrawerChatUsersRemove}}}
    {{/isEqual}}
</div>
`;
