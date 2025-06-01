import classNames from './Link.module.scss';

export default `
<a href="{{url}}" class="{{#trim}}${classNames.link} {{className}}{{/trim}}">
    {{#isArray Children}}
        {{#each Children}}
            {{{this}}}
        {{/each}}
    {{else}}
        {{{Children}}}
    {{/isArray}}
</a>
`;
