import classNames from './ChatsConnector.module.scss';

export default `
<div class="${classNames.root}">
    {{#if Chats}}
        <ul class="${classNames.chats}">
            {{#each Chats}}
                <li class="${classNames.chat}">
                    {{{this}}}
                </li>
            {{/each}}
        </ul>
    {{/if}}
</div>
`;
