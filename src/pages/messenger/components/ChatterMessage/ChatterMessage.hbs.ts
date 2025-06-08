import classNames from './ChatterMessage.module.scss';

export default `
<div class="${classNames.message} {{#if isMine}}${classNames.messageMine}{{/if}}">
    <p> 
        {{breaklines message.content}}
    </p>
    <div class="${classNames.info}">
        <span>
            От: {{message.user_id}}
        </span>
        <span>{{dater message.time}}</span> 
    </div>
</div>
`;
