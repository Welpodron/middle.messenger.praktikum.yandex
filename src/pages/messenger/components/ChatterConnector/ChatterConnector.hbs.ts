import classNames from './ChatterConnector.module.scss';

export default `
<div {{#unless state.chat}}class="centered"{{/unless}}>
    {{#if state.chat}}
        <div class="${classNames.box}">
            {{{ChatterHeader}}}
            {{{ChatterMessages}}}
            {{{ChatterFooter}}}
        </div>
    {{else}}
        <p>Выберите чат или создайте новый</p>
    {{/if}}
</div>
`;
