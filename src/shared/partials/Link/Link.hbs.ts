import classNames from './Link.module.scss';

export default `
<a href="{{url}}" class="${classNames.link} {{className}}">
    {{#if @partial-block}}
        {{> @partial-block }}
    {{else}}
        {{text}}
    {{/if}}
</a>
`;
