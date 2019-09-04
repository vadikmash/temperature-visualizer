"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require('react');
const styles = require('./App.css');
const Canvas = require('./components/canvas').default;
const ControlPannel = require('./components/controlPannel').default;
const Console = require('./components/console').default;
const Scale = require('./components/scale').default;
const App = () => {
    return (React.createElement("div", { className: styles.wrapper },
        React.createElement(Scale, null),
        React.createElement("div", null,
            React.createElement(Canvas, null),
            React.createElement(Console, null)),
        React.createElement(ControlPannel, null)));
};
exports.default = App;
//# sourceMappingURL=App.js.map