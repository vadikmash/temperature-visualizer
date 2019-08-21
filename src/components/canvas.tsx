import React = require('react')
// import { Stream } from 'stream'

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const StackBlur = require('stackblur-canvas')


let canvas

// const parseTemperatures = (str) => {
//   return str.split('~').map(arr => JSON.parse(arr))
// }

// const getBWColors = (str, bottom, top) => {
//   return str.split('~').map((tArr) => (
//     JSON.parse(tArr).map((tf) => {
//       const t =  Math.round(tf)
//       const shade = ((t - bottom) / (top - bottom) * 255)
//       return `rgb(${shade}, ${shade}, ${shade})`})
//   ))
// }

// const array = [[15.34,26.30,26.39,26.74,26.85,26.31,27.10,26.23,26.86,27.25,26.84,27.12,25.83,25.61,24.77,25.36],
//                [23.14,24.20,24.76,25.58,27.88,27.56,27.30,26.59,27.06,28.54,27.96,28.40,26.47,26.87,27.99,27.41],
//                [23.45,25.08,25.02,26.28,27.56,27.27,28.08,27.45,27.34,28.28,27.52,27.83,26.93,27.64,27.23,26.56],
//                [21.97,24.02,24.00,24.56,25.25,25.45,26.17,26.15,26.05,26.80,25.87,26.96,26.53,26.23,27.40,27.39]]

function drawPixels(ctx, data, bottom, top) {
  let j = 0
  String(data).split('~').forEach((row, j) => {
    let i = 0
    JSON.parse(row).forEach((t, i) => {
      const shade = (t - bottom < 0 ? 0 : t - bottom) / (top - bottom) * 255
      ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`
      ctx.beginPath();
      ctx.rect(i * 48, j * 48, 48, 48)
      ctx.fill()
    })
  })
  StackBlur.canvasRGB(canvas, 0, 0, 768, 192, 40);
}

class Canvas extends React.Component {
  componentDidMount() {
    const ctx = canvas.getContext("2d");

    const portName = 'COM5';

    const port = new SerialPort(portName, {
      baudRate: 115200,
    });

    const parser = port.pipe(new Readline());

    port.on('open', () => console.log('connection opened'));

    port.on('error', (err) => {
      console.log('Error: ', err.message)
    })

    let data = null;

    parser.on('data', (d) => {
      data = d
      requestAnimationFrame(drawPixels.bind(null, ctx, data, 23, 33))
    });
  }

  render() {

    return (
      <canvas
        height="192"
        width="768"
        style={
          {
            border: '1px solid black',
          }
        }
        ref={ node => canvas = node }
      >
      </canvas>
    )
  }
}

export default Canvas
