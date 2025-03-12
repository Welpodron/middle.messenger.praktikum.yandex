import classNames from './FormFieldMessage.module.scss';

export default `
<div class="${classNames.field} {{className}}">
    {{{Placeholder}}}
    {{{Input}}}
    {{{ErrorText}}}
</div>
`;
