import classNames from './Dialog.module.scss';

export default `
<dialog class="${classNames.dialog}">
    <div class="${classNames.header}">
        <span>{{title}}</span>
        {{{ButtonClose}}}
    </div>
    <div class="${classNames.content}">
        {{{Children}}}
    </div>
</dialog>
`;
