import classNames from './Sidebar.module.scss';

export default `
<aside class="${classNames.aside}">
    {{{LinkUser}}}
    {{{ChatsConnector}}}
    <div class="${classNames.tools}">
        {{{ButtonChatCreate}}}
        {{{DrawerChatCreate}}}
    </div>
</aside>
`;
