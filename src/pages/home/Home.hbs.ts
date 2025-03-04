import classNames from './Home.module.scss';

export default `
<main class="centered ${classNames.page}">
    <div>
        <h1>{{title}}</h1>
        <p>{{description}}</p>
    </div>
    {{{Nav}}}
</main>
`;
