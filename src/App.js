"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const store_1 = require("./store");
const Canvas = require('./components/canvas').default;
const App = () => {
    return (React.createElement(react_redux_1.Provider, { store: store_1.default },
        React.createElement("div", null, "HELLO WORLD"),
        React.createElement(Canvas, null)));
};
exports.default = App;
//# sourceMappingURL=App.js.map