import classNames from './Drawer.module.scss';

export default `
<dialog class="{{#trim}}${classNames.drawer} {{#isEqual position 'right'}}${classNames.right}{{/isEqual}} {{#isEqual position 'left'}}${classNames.left}{{/isEqual}} {{#isEqual position 'bottom'}}${classNames.bottom}{{/isEqual}} {{className}}{{/trim}}">
    <div class="${classNames.header}">
        <span>{{title}}</span>
        {{{ButtonClose}}}
    </div>
    <div class="${classNames.content}">
        {{#isArray Children}}
            {{#each Children}}
                {{{this}}}
            {{/each}}
        {{else}}
            {{{Children}}}
        {{/isArray}}
    </div>
</dialog>
`;
