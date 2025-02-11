import classNames from "./Chats.module.scss";

export default `
<aside class="${classNames.aside}">
    <div class="${classNames.header}">
        {{#> Link url="/settings" }}
            {{> Avatar picture=user.avatar }}
        {{/ Link }}
    </div>
    <div>
        {{> Skeleton }}
    </div>
    <div class="${classNames.list}">
        {{> Skeleton }}
    </div>
</aside>
`;
