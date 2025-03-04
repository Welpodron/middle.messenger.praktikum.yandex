import classNames from './FormAvatarChange.module.scss';

export default `
<form>
    {{{InputAvatar}}}
    <div class="${classNames.actions}">
        {{{ErrorText}}}
        {{{ButtonChangeAvatar}}}
    </div>
</form>
`;
