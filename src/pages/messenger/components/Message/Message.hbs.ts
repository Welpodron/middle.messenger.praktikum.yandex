import classNames from './Message.module.scss';

export default `
<div class="${classNames.message} {{#if isMine}}${classNames.messageMine}{{/if}}">
    <p>{{content}}</p>
    <div class="${classNames.info}">
        <span class="${classNames.author}">
            {{#if author.display_name}}
                {{author.display_name}}
            {{else}}
                {{author.login}}
            {{/if}}
        </span>
        <div class="${classNames.meta}">  
            <span class="${classNames.time}">{{time}}</span> 
        </div>
    </div>
</div>
`;
