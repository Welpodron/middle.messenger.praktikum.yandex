import classNames from './Avatar.module.scss';
import { IMAGE_PROXY_URL } from './constants';

export default `
<span class="${classNames.avatar} {{#if isLarge}}${classNames.avatarLarge}{{/if}}">
    {{#if picture}}
        <img class="${classNames.image}" src="{{#if isExternal}}{{picture}}{{else}}${IMAGE_PROXY_URL}{{picture}}{{/if}}" alt="{{alt}}" />
    {{/if}}
</span>
`;
