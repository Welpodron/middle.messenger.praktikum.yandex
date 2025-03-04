import classNames from './ChatterHeader.module.scss';

export default `
<div class="${classNames.header}">
    <div class="${classNames.info}">
        {{{AvatarUser}}}
        <span class="${classNames.title}">
            {{#if user.display_name}}
                {{user.display_name}}
            {{else}}
                {{user.login}}
            {{/if}}
        </span>
    </div>
</div>
`;
