var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');
var React = require('react');
var ReactDOM = require('react-dom');
SerialPort.list().then(function (ports) {
    document.getElementById("port-list").innerHTML = "\n  <h1>Detected Serial Ports</h1>\n  <ul>\n    " + ports.map(function (port) { return "<li>" + port.comName + "</li>"; }).join('') + "\n  </ul>\n  ";
});
var portName = 'COM5';
var port = new SerialPort(portName, {
    baudRate: 115200,
});
var parser = port.pipe(new Readline());
port.on('open', function () { return console.log('connection opened'); });
var string;
parser.on('data', function (data) {
    string = String(data);
});
setInterval(function () { return document.getElementById('data').innerText = string; }, 300);
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", null, "hello world"));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map