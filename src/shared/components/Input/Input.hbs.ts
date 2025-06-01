import classNames from './Input.module.scss';

export default `
<input class="${classNames.input} {{className}}" {{#if isReadonly}}readonly{{/if}} {{#if isDisabled}}disabled{{/if}} type="{{type}}" name="{{name}}" {{#if value}}value="{{value}}"{{/if}} {{#if autocomplete}}autocomplete="{{autocomplete}}"{{/if}} {{#if accept}}accept="{{accept}}"{{/if}} {{#if placeholder}}placeholder="{{placeholder}}"{{/if}} {{#if isRequired}}required{{/if}} />
`;
