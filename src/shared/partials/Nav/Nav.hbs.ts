import classNames from "./Nav.module.scss";

export default `
<nav class="${classNames.nav}">
    {{#each links}}
        {{> Link url=this.url text=this.text}}
    {{/each}}
</nav>
`;
