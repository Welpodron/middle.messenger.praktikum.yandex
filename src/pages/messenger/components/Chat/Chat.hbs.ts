import classNames from './Chat.module.scss';

export default `
<button type="button" class="{{#trim}}${classNames.root} {{#if isActive}}${classNames.active}{{/if}}{{/trim}}">
    <span class="${classNames.content}">
        {{{Avatar}}}
        <span class="${classNames.info}"> 
            <span class="${classNames.title}">{{chat.title}}</span>
            {{#if chat.last_message.content}}
                <span class="${classNames.message}">
                    {{chat.last_message.content}}
                </span>
            {{/if}}
        </span>
        {{#if chat.last_message.time}}
            <span class="${classNames.meta}">
                <span class="${classNames.time}">{{dater chat.last_message.time}}</span>
                {{#if chat.unread_count}}
                    <span class="${classNames.counter}">{{chat.unread_count}}</span>
                {{/if}}
            </span>
        {{/if}}
    </span>
</button>
`;
