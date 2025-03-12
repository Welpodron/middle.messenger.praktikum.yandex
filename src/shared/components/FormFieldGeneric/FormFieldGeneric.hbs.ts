import classNames from './FormFieldGeneric.module.scss';

export default `
<label class="${classNames.field} {{className}}">
    <span class="${classNames.label} {{labelClassName}}">{{label}}</span>
    {{{Input}}}
    {{{ErrorText}}}
</label>
`;
