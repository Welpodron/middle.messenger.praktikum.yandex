import classNames from './Chat.module.scss';

export default `
<button type="button" class="${classNames.root}" {{#if isActive}}data-active{{/if}}>
    <span class="${classNames.content}">
        {{{Avatar}}}
        <span class="${classNames.info}"> 
            <span class="${classNames.title}">{{title}}</span>
            {{#if last_message.content}}
                <span class="${classNames.message}">
                    {{last_message.content}}
                </span>
            {{/if}}
        </span>
        {{#if last_message.time}}
            <span class="${classNames.meta}">
                <span class="${classNames.time}">{{last_message.time}}</span>
                {{#if unread_counter}}
                    <span class="${classNames.counter}">{{unread_counter}}</span>
                {{/if}}
            </span>
        {{/if}}
    </span>
</button>
`;
