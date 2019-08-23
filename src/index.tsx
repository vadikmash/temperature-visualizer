// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// const SerialPort = require('serialport')
// const Readline = require('@serialport/parser-readline')

require('css-modules-require-hook')({
  processCss: css => {
    let style = document.createElement('style')
    style.innerHTML = css
    document.head.appendChild(style)
  }
})

const React = require('react');
const ReactDOM = require('react-dom')

const App = require('./App').default


ReactDOM.render(<App />, document.getElementById('root'))


// SerialPort.list().then(ports => {
//   document.getElementById("port-list").innerHTML = `
//   <h1>Detected Serial Ports</h1>
//   <ul>
//     ${ports.map(port => `<li>${port.comName}</li>`).join('')}
//   </ul>
//   `
// })
