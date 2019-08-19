const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const React = require('react');
const ReactDOM = require('react-dom');
let App = require('./App');
App = App.default;
console.log(App);
SerialPort.list().then(ports => {
    document.getElementById("port-list").innerHTML = `
  <h1>Detected Serial Ports</h1>
  <ul>
    ${ports.map(port => `<li>${port.comName}</li>`).join('')}
  </ul>
  `;
});
const portName = 'COM5';
const port = new SerialPort(portName, {
    baudRate: 115200,
});
const parser = port.pipe(new Readline());
port.on('open', () => console.log('connection opened'));
let string;
parser.on('data', (data) => {
    string = String(data);
});
setInterval(() => document.getElementById('data').innerText = string, 300);
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map