import loaderIcon from '@icons/loader.svg?raw';

import classNames from './Button.module.scss';

export default `
<button type="{{type}}" {{#if isDisabled}}disabled{{/if}} class="{{#trim}}${classNames.root} {{#if isSquare}}${classNames.square}{{/if}} {{#if isFull}}${classNames.full}{{/if}} {{#if isRound}}${classNames.round}{{/if}} {{#if isDanger}}${classNames.danger}{{/if}} {{#if isLoading}}${classNames.loading}{{/if}} {{className}}{{/trim}}">
    {{#if isLoading}}
        <span class="animate-spin">${loaderIcon}</span>
    {{else}}
        {{#isArray Children}}
            {{#each Children}}
                {{{this}}}
            {{/each}}
        {{else}}
            {{{Children}}}
        {{/isArray}}
    {{/if}}
</button>
`;
