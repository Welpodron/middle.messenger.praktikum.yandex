import classNames from './Messenger.module.scss';

export default `
<div class="${classNames.page}">
    <h1 class="sr-only">{{title}}</h1>
    {{{Sidebar}}}
    {{{Chatter}}}
    {{{DialogCreateChat}}}
</div>
`;
