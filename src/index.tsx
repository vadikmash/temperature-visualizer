// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const React = require('react');
const ReactDOM = require('react-dom')

let App = require('./App')
App = App.default

console.log(App)

SerialPort.list().then(ports => {
  document.getElementById("port-list").innerHTML = `
  <h1>Detected Serial Ports</h1>
  <ul>
    ${ports.map(port => `<li>${port.comName}</li>`).join('')}
  </ul>
  `
})

const portName = 'COM5';

const port = new SerialPort(portName, {
  baudRate: 115200,
});

const parser = port.pipe(new Readline());

port.on('open', () => console.log('connection opened'));

let string;

parser.on('data', (data) => {
  string = String(data)
  // console.log(string)
});

setInterval(() =>   document.getElementById('data').innerText = string, 300)


// class App extends React.Component {
//   render() {
//     return (<div>hello world</div>)
//   }
// }

ReactDOM.render(<App />, document.getElementById('root'))
