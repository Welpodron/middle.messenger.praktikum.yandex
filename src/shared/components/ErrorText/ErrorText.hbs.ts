import classNames from './ErrorText.module.scss';

export default `
<span class="${classNames.error}" {{#unless error}}hidden{{/unless}}>{{error}}</span>
`;
