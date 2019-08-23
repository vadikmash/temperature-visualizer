require('css-modules-require-hook')({
    processCss: css => {
        let style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }
});
const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./App').default;
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map