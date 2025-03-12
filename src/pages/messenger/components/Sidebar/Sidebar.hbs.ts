import classNames from './Sidebar.module.scss';

export default `
<aside class="${classNames.aside}">
    <div class="${classNames.header}">
        {{{LinkUser}}}
    </div>
    <div class="${classNames.tools}">
        {{{FormChatSearch}}}
        {{{ButtonCreateChat}}}
    </div>
    {{{ChatsList}}}
</aside>
`;
