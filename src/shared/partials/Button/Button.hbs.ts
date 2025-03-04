import classNames from './Button.module.scss';

export default `
<button type="{{type}}" class="${classNames.button} {{#if isFull}}${classNames.buttonFull}{{/if}} {{#if isRound}}${classNames.buttonRound}{{/if}} {{#if isDanger}}${classNames.buttonDanger}{{/if}} {{className}}">
    {{#if @partial-block}}
        {{> @partial-block }}
    {{else}}
        {{text}}
    {{/if}}
</button>
`;
