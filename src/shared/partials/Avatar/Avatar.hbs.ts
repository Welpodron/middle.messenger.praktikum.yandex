import classNames from "./Avatar.module.scss";

export default `
<div class="${classNames.avatar} {{#if isLarge}}${classNames.avatarLarge}{{/if}}">
    {{#if picture}}
        <img class="${classNames.image}" src="{{picture}}" alt="" />
    {{/if}}
</div>
`;
