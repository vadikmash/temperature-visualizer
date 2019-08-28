const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const fs = require('fs')

import { drawPixels } from '../drawPixels'
import store from '../store';
import { combineReducers } from 'redux';
import { object } from 'prop-types';

export const SET_BLUR = 'SET_BLUR'
export const SET_RANGE = 'SET_RANGE'
export const SET_PORT_NAME = 'SET_PORT_NAME'
export const SET_VISUALIZER = 'SET_VISUALIZER'
export const SET_AVALIABLE_PORTS = 'SET_AVALIABLE_PORTS'
export const SET_CANVAS = 'SET_CANVAS'
export const COM_CONNECT = 'COM_CONNECT'
export const SET_OFFSETS = 'SET_OFFSETS'
export const SHOW_HINT = 'SHOW_HINT'
export const HIDE_HINT = 'HIDE_HINT'


export const showHint = (event) => {
  const state: any = store.getState()
  const {
    pixelSize,
    comData
  } = state.data

  const posX = event.clientX
  const posY = event.clientY

  const x = Math.floor(posX / pixelSize)
  const y = Math.floor(posY / pixelSize)

  const highlighted = Array(4).fill(Array(16)).map(row => row.map(() => {
    false
  }))
  highlighted[y][x] = true

  return  {
    type: SHOW_HINT,
    hoverPixel: { x, y },
    highlighted,
    mousePosition: { posX, posY }
  }
}

export const hideHint = () => {
  const highlighted = Array(4).fill(Array(16).fill(false))
  return {
    type: HIDE_HINT,
    highlighted
  }
}

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

export const highlightPixel = (x, y) => {
  let highlighted = Array(4).fill(Array(16)).map(h => h.map(() => false))
  highlighted[y][x] = true

  return {
    type: HIGHLIGHT_PIXEL,
    highlighted
  }
}

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


export const logToFile = () => {
  const state: any = store.getState()
  const { temperatures } = state.data.comData
  const { offsets } = state.data
  const offsetTemperatures = temperatures.map((row, i) => row.map((t, j) => 
    Math.round(t + offsets[i][j])
  ))

  const json = JSON.stringify(offsetTemperatures)
  const date = new Date().toLocaleString().split(', ').join('_')
  const str = `${date},${json}\r\n`

  fs.appendFile('log.txt', str, (err) =>{
    if (err) console.log(err)
    console.log('logged to log.txt')
  })
}

export const calibrate = () => {
  const state: any = store.getState()
  const { temperatures } = state.data.comData

  const average = temperatures.reduce((accum, val) => (
    accum + val.reduce((a, v) => a + v, 0)
  ), 0) / temperatures.length / temperatures[0].length

  const offsets = temperatures.map(arr => (
    arr.map(t => (
      average - t
    ))
  ))

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

  port.on('close', () => console.log('connection closed'))

  const comData = {
    temperatures: null
  }

  parser.on('data', data => {
    let temperatures
    try {
      temperatures = JSON.parse(data)
      comData.temperatures = temperatures
    } catch(e) {
      console.log(e)
    }
    const state: any = store.getState()
    const {
      canvas,
      context,
      blur,
      range,
      offsets,
      highlighted,
      visualizingFunction
    } = state.data
    requestAnimationFrame(() => drawPixels(
      canvas,
      context,
      comData.temperatures,
      offsets,
      highlighted,
      visualizingFunction,
      range[0], range[1],
      blur))
  });

  return {
    type: COM_CONNECT,
    port, 
    parser,
    comData
  }
}