import classNames from './FormChatMessage.module.scss';

export default `
<form class="${classNames.root}">
    <div class="${classNames.container}">
        {{{FieldTitle}}}
        {{{ButtonSend}}}
    </div>
    {{{ErrorText}}}
</form>`;
