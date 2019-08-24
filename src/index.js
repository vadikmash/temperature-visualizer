"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('css-modules-require-hook')({
    processCss: css => {
        let style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    }
});
const React = require('react');
const ReactDOM = require('react-dom');
const react_redux_1 = require("react-redux");
const store_1 = require("./store");
const App = require('./App').default;
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store_1.default },
    React.createElement(App, null)), document.getElementById('root'));
//# sourceMappingURL=index.js.map