import classNames from './Chatter.module.scss';

export default `
<main {{#unless ChatterBox}}class="centered"{{/unless}}>
    {{#if ChatterBox}}
        {{{ChatterBox}}}
    {{else}}
        <p class="${classNames.empty}">Выберите чат чтобы отправить сообщение</p>
    {{/if}}
</main>
`;
