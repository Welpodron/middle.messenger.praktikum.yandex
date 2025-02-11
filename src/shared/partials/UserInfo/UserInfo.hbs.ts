import classNames from "./UserInfo.module.scss";

export default `
<div>
    {{> Avatar picture=avatar }}
    <h2>{{name}}</h2>
    <dl>
        {{#each properties as |property|}}
            <div>
                <dt>{{property.name}}</dt>
                <dd>{{property.value}}</dd>
            </div>
        {{/each}}
    </dl>
</div>
`;
