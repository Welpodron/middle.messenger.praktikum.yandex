import classNames from './Alert.module.scss';

export default `
<div class="{{#trim}}${classNames.root} {{#isEqual alert.type 'error'}}${classNames.error}{{/isEqual}} {{#isEqual alert.type 'success'}}${classNames.success}{{/isEqual}} {{className}}{{/trim}}">
    <span class="${classNames.message}">{{alert.message}}</span>
    {{{ButtonClose}}}
</div>
`;
