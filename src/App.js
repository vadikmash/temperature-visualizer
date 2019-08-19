"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
let store = require('./store');
store = store.default;
const App = () => {
    return (React.createElement(react_redux_1.Provider, { store: store },
        React.createElement("div", null, "HELLO WORLD")));
};
exports.default = App;
//# sourceMappingURL=App.js.map