const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const fs = require('fs')

import { drawPixels } from '../drawPixels'
import store from '../store';
import { combineReducers } from 'redux';

export const SET_BLUR = 'SET_BLUR'
export const SET_RANGE = 'SET_RANGE'
export const SET_PORT_NAME = 'SET_PORT_NAME'
export const SET_VISUALIZER = 'SET_VISUALIZER'
export const SET_AVALIABLE_PORTS = 'SET_AVALIABLE_PORTS'
export const SET_CANVAS = 'SET_CANVAS'
export const COM_CONNECT = 'COM_CONNECT'
export const SET_OFFSETS = 'SET_OFFSETS'


export const setCanvas = (canvas) => {
  const context = canvas.getContext('2d')
  return { 
    type: SET_CANVAS,
    canvas,
    context
  }
}

const isPortLost = (ports, name) => (
  !ports.reduce((accum, port) => accum || port.comName === name, false)
)

export const setAvaliablePorts = (ports) => {
  const state: any = store.getState()
  const { portName, avaliablePorts } = state.data
  const oldLength = avaliablePorts.length
  if (!portName
      || isPortLost(ports, portName)
      || oldLength < ports.length) {
    if (ports) {
      store.dispatch(setPortName(ports[0].comName))
      store.dispatch(comConnect())
    } else {
      store.dispatch(setPortName(''))
    }
  }
  return {
    type: SET_AVALIABLE_PORTS,
    ports
  }
}

export const setBlur = (blur: number) => (
  {
    type: SET_BLUR,
    blur
  }
)

export const setRange = (range: object) => (
  {
    type: SET_RANGE,
    range
  }
)

export const setPortName = (portName: string) => (
  {
    type: SET_PORT_NAME,
    portName
  }
)

export const setVisualizer = (visualizer: string) => (
  {
    type: SET_VISUALIZER,
    visualizer
  }
)

export const findAvailablePorts = () => {
  SerialPort.list().then(ports => {
    store.dispatch(setAvaliablePorts(ports))
  })
} 

export const saveImage = () => {
  const state: any = store.getState()
  const { canvas } = state.data
  const url = canvas.toDataURL('image/jpg', 0.8)
  const base64Data = url.replace(/^data:image\/png;base64,/, "")
  const date = new Date().toLocaleString().split(', ').join('_').split('.').join('_').split(':').join('_')
  fs.writeFile(`${date}_image.jpg`, base64Data, 'base64', (err) => {
    if (err) console.log(err)
    console.log('image is saved')
  })
}

let dataBuf

export const logToFile = () => {
  const date = new Date().toLocaleString().split(', ').join('_')
  const str = `${date}-${String(dataBuf)}\r\n`
  fs.appendFile('log.txt', str, (err) =>{
    if (err) console.log(err)
    console.log('logged to log.txt')
  })
}

export const calibrate = () => {
  const temperatures = String(dataBuf).split('~').map(arr => (
    JSON.parse(arr)
  ))

  const average = temperatures.reduce((accum, val) => (
    accum + val.reduce((a, v) => a + v, 0)
  ), 0) / temperatures.length / temperatures[0].length

  const offsets = temperatures.map(arr => (
    arr.map(t => (
      average - t
    ))
  ))

  console.log(offsets)

  return {
    type: SET_OFFSETS,
    offsets
  }
}


export const comConnect = () => {
  const state: any = store.getState()

  const { portName } = state.data
  const oldPort = state.data.port
  if (oldPort && oldPort.isOpen) oldPort.close()

  const port = new SerialPort(portName, {
    baudRate: 115200,
  });


  const parser = port.pipe(new Readline());

  port.on('open', () => console.log('connection opened'));

  port.on('error', err => {
    console.log('Error: ', err.message)
  })


  parser.on('data', data => {
    dataBuf = data
    const state: any = store.getState()
    const {
      canvas,
      context,
      blur,
      range,
      offsets,
      visualizingFunction
    } = state.data
    requestAnimationFrame(() => drawPixels(
      canvas,
      context,
      data,
      offsets,
      visualizingFunction,
      range[0], range[1],
      blur))
  });

  return {
    type: COM_CONNECT,
    port, 
    parser
  }
}