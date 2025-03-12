import classNames from './Avatar.module.scss';

export default `
<span class="${classNames.avatar} {{#if isLarge}}${classNames.avatarLarge}{{/if}}">
    {{#if picture}}
        <img class="${classNames.image}" src="{{picture}}" alt="{{alt}}" />
    {{/if}}
</span>
`;
