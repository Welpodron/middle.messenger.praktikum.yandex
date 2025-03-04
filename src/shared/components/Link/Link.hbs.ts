import classNames from './Link.module.scss';

export default `
<a href="{{url}}" class="${classNames.link} {{className}}">
    {{{Children}}}
</a>
`;
