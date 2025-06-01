import classNames from './FormPasswordChange.module.scss';

export default `
<form>
    {{{FieldOldPassword}}}
    {{{FieldNewPassword}}}
    <div class="${classNames.actions}">
        {{{ErrorText}}}
        {{{ButtonChangePassword}}}
    </div>
</form>
`;
