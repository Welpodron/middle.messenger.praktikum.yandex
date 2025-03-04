import classNames from "./Input.module.scss";

export default `
<label class="${classNames.field}">
    <span class="${classNames.label}">{{label}}</span>
    <input class="${classNames.input}" type="{{type}}" name="{{name}}" {{#if value}}value="{{value}}"{{/if}} {{#if autocomplete}}autocomplete="{{autocomplete}}"{{/if}} {{#if placeholder}}placeholder="{{placeholder}}"{{/if}} {{#if isRequired}}required{{/if}} />
</label>
`;
