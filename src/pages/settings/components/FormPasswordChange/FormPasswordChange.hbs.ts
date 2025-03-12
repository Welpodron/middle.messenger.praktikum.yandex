import classNames from './FormPasswordChange.module.scss';

export default `
<form>
    {{{FieldPassword}}}
    {{{FieldNewPassword}}}
    {{{FieldNewPasswordRepeated}}}
    <div class="${classNames.actions}">
        {{{ErrorText}}}
        {{{ButtonChangePassword}}}
    </div>
</form>
`;
