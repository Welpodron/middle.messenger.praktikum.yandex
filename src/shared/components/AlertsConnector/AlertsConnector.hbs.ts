import classNames from './AlertsConnector.module.scss';

export default `
<div class="${classNames.root}">
    {{#if Alerts}}
        <ul class="${classNames.alerts}">
            {{#each Alerts}}
                <li>
                    {{{this}}}
                </li>
            {{/each}}
        </ul>
    {{/if}}
</div>
`;
