"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.css");
const Canvas = require('./components/canvas').default;
const ControlPannel = require('./components/controlPannel').default;
const Console = require('./components/console').default;
const Scale = require('./components/scale').default;
const App = () => {
    return (react_1.default.createElement("div", { className: 'wrapper' },
        react_1.default.createElement(Scale, null),
        react_1.default.createElement("div", null,
            react_1.default.createElement(Canvas, null),
            react_1.default.createElement(Console, null)),
        react_1.default.createElement(ControlPannel, null)));
};
exports.default = App;
//# sourceMappingURL=App.js.map