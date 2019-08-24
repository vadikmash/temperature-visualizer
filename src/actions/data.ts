const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
import { drawPixels } from '../drawPixels'

import store from '../store';
import { WSAEINVALIDPROVIDER } from 'constants';

export const SET_BLUR = 'SET_BLUR'
export const SET_RANGE = 'SET_RANGE'
export const SET_PORT_NAME = 'SET_PORT_NAME'
export const SET_VISUALIZER = 'SET_VISUALIZER'
export const SET_AVALIABLE_PORTS = 'SET_AVALIABLE_PORTS'
export const SET_CANVAS = 'SET_CANVAS'
export const COM_CONNECT = 'COM_CONNECT'


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
    const state: any = store.getState()
    const {
      canvas,
      context,
      blur,
      range,
      visualizingFunction
    } = state.data
    requestAnimationFrame(() => drawPixels(
      canvas,
      context,
      data,
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