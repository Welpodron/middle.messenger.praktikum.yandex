import classNames from './Button.module.scss';

export default `
<button type="{{type}}" {{#if isDisabled}}disabled{{/if}} class="${classNames.button} {{#if isFull}}${classNames.buttonFull}{{/if}} {{#if isRound}}${classNames.buttonRound}{{/if}} {{#if isDanger}}${classNames.buttonDanger}{{/if}} {{className}}">
    {{{Children}}}
</button>
`;
