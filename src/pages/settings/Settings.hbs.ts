import classNames from './Settings.module.scss';

export default `
<main class="${classNames.page}">
    <h1 class="sr-only">{{title}}</h1>
    {{{LinkBack}}}
    <section class="centered">
        {{{FormInfoChange}}}
    </section>
    {{{DialogAvatarChange}}}
    {{{DialogPasswordChange}}}
</main>
`;
