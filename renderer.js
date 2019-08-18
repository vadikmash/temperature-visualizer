// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const SerialPort = require('serialport')
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


port.on('open', () => console.log('connection opened'));


port.on('data', (data) => {
  const string = [...data].reduce((accum, d) => accum + String.fromCharCode(d), '')
  console.log(string)
});

