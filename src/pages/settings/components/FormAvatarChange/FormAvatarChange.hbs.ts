import classNames from './FormAvatarChange.module.scss';

export default `
<form class="${classNames.root}">
    {{{InputAvatar}}}
    <div class="${classNames.actions}">
        {{{ButtonChangeAvatar}}}
        {{{ErrorText}}}
    </div>
</form>
`;
