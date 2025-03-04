import classNames from './Conversation.module.scss';

export default `
<ul class="${classNames.messages}">
    {{#each Messages}}
        <li class="${classNames.message}">
            {{{this}}}
        </li>
    {{/each}}
</ul>
`;
