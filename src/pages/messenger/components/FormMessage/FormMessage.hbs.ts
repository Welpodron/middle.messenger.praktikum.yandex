import classNames from './FormMessage.module.scss';

export default `
<form class="${classNames.form}">
    <div class="${classNames.container}">
        {{{InputMessage}}}
        {{{ButtonSend}}}
    </div>
    <div>
        {{{ErrorText}}}
    </div>
</form>`;
