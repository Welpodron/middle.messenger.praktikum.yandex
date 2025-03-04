import classNames from './ChatterBox.module.scss';

export default `
<div class="${classNames.chatterBox}">
    <div class="${classNames.header}">
        {{{ChatterHeader}}}
    </div>
    <div class="${classNames.conversation}">
        {{{Conversation}}}
    </div>
    <div class="${classNames.footer}">
        {{{FormMessage}}}
    </div>
</div>
`;
