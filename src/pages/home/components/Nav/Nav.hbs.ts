import classNames from './Nav.module.scss';

export default `
<nav class="${classNames.nav}">
    {{#each Links}}
        {{{this}}}
    {{/each}}
</nav>
`;
