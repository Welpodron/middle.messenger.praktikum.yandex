import classNames from './ChatBackground.module.scss';

export default `
<span class="${classNames.background} {{#if isActive}}${classNames.backgroundActive}{{/if}}"></span>
`;
