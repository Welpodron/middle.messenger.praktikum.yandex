import classNames from './ChatterMessages.module.scss';

export default `
<div class="${classNames.messages}">
    {{#if ChatterMessages.length}}
        <div class="${classNames.actions}">
            {{{ButtonOld}}}
            {{{ButtonLast}}}
        </div>
    {{/if}}
    {{#each ChatterMessages}}
        <div class="${classNames.message}">
            {{{this}}}
        </div>
    {{/each}}
</div>
`;
