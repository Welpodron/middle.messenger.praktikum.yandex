import classNames from './FormPasswordChange.module.scss';

export default `
<form>
    {{{InputPassword}}}
    {{{InputNewPassword}}}
    {{{InputNewPasswordRepeated}}}
    <div class="${classNames.actions}">
        {{{ErrorText}}}
        {{{ButtonChangePassword}}}
    </div>
</form>
`;
