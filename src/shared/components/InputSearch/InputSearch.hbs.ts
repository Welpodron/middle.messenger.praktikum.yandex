import searchIcon from '@icons/search.svg?raw';

import classNames from './InputSearch.module.scss';

// TODO: По факту этот InputSearch уже обернут в label, те по сути это уже FormField, придумать better naming
export default `
<label class="${classNames.root} {{className}}">
    <span class="sr-only">{{label}}</span>
    <span class="${classNames.icon}">${searchIcon}</span>
    {{{Input}}}
</label>
`;
