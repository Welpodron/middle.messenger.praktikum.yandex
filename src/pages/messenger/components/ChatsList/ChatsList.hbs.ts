import classNames from './ChatsList.module.scss';

export default `
<div {{#unless Chats}}class="centered"{{/unless}}>
    {{#if Chats}}
        <ul class="${classNames.chats}">
            {{#each Chats}}
                <li class="${classNames.chat}">
                    {{{this}}}
                </li>
            {{/each}}
        </ul>
    {{else}}
        <p class="${classNames.empty}">Список чатов пуст</p>
    {{/if}}
</div>
`;
