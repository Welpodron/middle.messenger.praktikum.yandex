import classNames from './FormInfoChange.module.scss';

export default `
<form class="${classNames.form}">
    <h2>
        {{#if user.display_name}}
            {{user.display_name}}
        {{else}}
            {{user.login}}
        {{/if}}
    </h2>
    <span>ID: {{user.id}}</span>
    {{{FieldEmail}}}
    {{{FieldLogin}}}
    {{{FieldFirstName}}}
    {{{FieldSecondName}}}
    {{{FieldDisplayName}}}
    {{{FieldPhone}}}
    <div class="${classNames.actions}">
        {{{ErrorText}}}
        {{{ButtonChangeInfo}}}
    </div>
</form>
`;
