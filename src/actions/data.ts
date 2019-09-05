const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const fs = require('fs')
const os = require('os')
const path = require('path')


import store from '../store';

import { drawPixels } from '../drawPixels'

import { log } from '../logger'

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
export const FLUSH_DATA = 'FLUSH_DATA'
export const SET_DISPLAYMODE = 'SET_DISPLAYMODE'
export const INIT_WORKDIR = 'INIT_WORKDIR'
export const START_RECORDING = 'START_RECORDING'
export const PAUSE_RECORDING = 'PAUSE_RECORDING'
export const RESUME_RECORDING = 'RESUME_RECORDING'
export const FINISH_RECORDING = 'FINISH_RECORDING'
export const LOG_TO_CONSOLE = 'LOG_TO_CONSOLE'
export const TOGGLE_FREEZE = 'TOGGLE_FREEZE'



export const toggleFreeze = () => (
  {
    type: TOGGLE_FREEZE
  }
)

export const logToConsole = (message: string) => (
  {
    type: LOG_TO_CONSOLE, 
    message
  }
)

export const startRecording = () => {
  const state: any = store.getState()

  const { dirs } = state.data
  const { recorddir } = dirs

  const fileDate = new Date().toLocaleString().split(', ').join('_').split('.').join('').split(':').join('')
  const recordpath = path.resolve(recorddir, `${fileDate}_record.txt`)

  logToFile(true, true, recordpath)
  const interval = setInterval(() => logToFile(true), 100)

  log(`started recording to: ${recordpath}`)

  return {
    type: START_RECORDING,
    payload: {
      interval,
      recordpath
    }
  }
}

export const pauseRecording = () => {
  const state: any = store.getState()
  const { interval } = state.recording 
  clearInterval(interval)

  log(`pused recording`)

  return {
    type: PAUSE_RECORDING,
  }
}

export const resumeRecording = () => {
  logToFile(true, true)
  const interval = setInterval(() => logToFile(true), 100)

  log(`resumed recording`)

  return {
    type: RESUME_RECORDING,
    payload: {
      interval
    }
  }
}

export const finishRecording = () => {
  const state: any = store.getState()
  const { interval, recordpath } = state.recording 
  clearInterval(interval)

  log(`finished recording to: ${recordpath}`)

  return {
    type: FINISH_RECORDING,
  }
}

export const openWorkdir = () => {
  const state: any = store.getState()
  const { shell } = require('electron')

  const { workdir } = state.data.dirs

  shell.openItem(workdir)
}

export const initWorkdir = (customPpath: any) => {
  const dir = customPpath || os.homedir()
  const workdir = path.resolve(dir, 't-visualizer_data')
  const photodir = path.resolve(workdir, 'photos')
  const recorddir = path.resolve(workdir, 'records')
  const configpath = path.resolve(workdir, 'config.json')

  // make directory and sub directories and config.json if it doesnt exist

  if (!fs.existsSync(workdir)){
    fs.mkdirSync(workdir);
    fs.mkdirSync(photodir);
    fs.mkdirSync(recorddir);
    fs.whriteFile(configpath, JSON.stringify({}), err => {
      if (err)log(err)
    })
   log(`created new working directory: ${workdir}`)
  } else {
    if (!fs.existsSync(configpath))
      fs.writeFile(configpath, JSON.stringify({}), err => {
        if (err)log(err)
      })
    if (!fs.existsSync(photodir))
      fs.mkdirSync(photodir);
    if (!fs.existsSync(recorddir))
      fs.mkdirSync(recorddir);
  }

  return {
    type: INIT_WORKDIR,
    dirs: {
      workdir,
      photodir,
      recorddir
    }
  }

}

export const setDisplayMode = mode => {
  log(`switched to ${mode} mode`)

  return {
    type: SET_DISPLAYMODE,
    mode
  }
}

export const flushData = (data) => (
  {
    type: FLUSH_DATA,
    data
  }
)

export const loadConfig = () => {
  const state: any = store.getState()
  const { workdir } = state.data.dirs

  const configpath = path.resolve(workdir, 'config.json')

  fs.readFile(configpath, (error, buffer) => {

    if (error) {
     log('config file was not found')
    } else {
      const data = JSON.parse(buffer)
      store.dispatch(flushData(data))
    }
  })
}

export const showHint = event => {
  const state: any = store.getState()
  const {
    pixelSize,
    displayMode,
    pannels, 
    canvas
  } = state.data

  const canvasPos = canvas.getBoundingClientRect()

  const posX = event.clientX
  const posY = event.clientY

  const x = Math.floor((posX - canvasPos.left) / pixelSize)
  const y = Math.floor((posY - canvasPos.top)/ pixelSize)

  const highlighted = Array(4).fill(Array(16)).map(row => row.map(() => (
    false
  )))

  if (displayMode === 'pixel') {
    highlighted[y][x] = true
  }

  let hoverPannel = ''

  if (displayMode === 'pannel') {
    // looking for pannel, that we hover our mouse over
    for (const pannel in pannels) {
      pannels[pannel].forEach(pixel => {
        if (pixel[0] === x && pixel[1] === y) {
          hoverPannel = pannel
        }
      });
      if (hoverPannel) break
    }
    // highlighting pannel
    if (hoverPannel) {
      pannels[hoverPannel].forEach(pixel => {
        const [x, y] = pixel
        highlighted[y][x] = true
      });
    }
  }

  const {
    context,
    blur,
    range,
    offsets,
    visualizingFunction,
    comData
  } = state.data
  requestAnimationFrame(() => drawPixels(
    canvas,
    context,
    comData.temperatures,
    offsets,
    highlighted,
    visualizingFunction,
    range[0], range[1],
    blur
  ))

  return  {
    type: SHOW_HINT,
    hoverPixel: { x, y },
    highlighted,
    mousePosition: { posX, posY },
    hoverPannel
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

export const updatePort = (portName) => {
  store.dispatch(setPortName(portName))
  store.dispatch(comConnect())
}

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
  const { canvas, dirs} = state.data

  const url = canvas.toDataURL('image/jpg', 0.8)
  const base64Data = url.replace(/^data:image\/png;base64,/, "")
  const date = new Date().toLocaleString().split(', ').join('_').split('.').join('').split(':').join('')

  const { photodir } = dirs
  const photopath = path.resolve(photodir, `${date}_image.jpg`)

  fs.writeFile(photopath, base64Data, 'base64', (err) => {
    if (err) log(err.message)
    log(`image is saved to ${photopath}`)
  })
}


export const logToFile = (recording?, resuming?, argRecordpath?) => {
  const state: any = store.getState()
  const { temperatures } = state.data.comData
  const { offsets, dirs } = state.data
  const { workdir } = dirs

  
  const offsetTemperatures = temperatures.map((row, i) => row.map((t, j) => 
    Math.round((t + offsets[i][j]) * 100) / 100
  ))


  const json = JSON.stringify(offsetTemperatures)

   
  if (recording) {
    const recordpath = argRecordpath || state.recording.recordpath

    let str
    if (resuming) {
      const date = new Date().toLocaleString().split(', ').join('_')
      str = `\r\n${date}\r\n\r\n\t${json}\r\n`
    } else {
      str = `\t${json}\r\n`
    }

    fs.appendFile(recordpath, str, err => {
      if (err) log(err.message)
    })
  } else {
    const date = new Date().toLocaleString().split(', ').join('_')
    const str = `${date}\r\n\t${json}\r\n\r\n`

    const logpath = path.resolve(workdir, 'log.txt')

    fs.appendFile(logpath, str, err => {
      if (err) log(err.message)
     log(`logged to ${logpath}`)
    })
  }
}

export const writeToConfig = (newData: object) => {
  const state: any = store.getState()
  const { workdir } = state.data.dirs
  const configpath = path.resolve(workdir, 'config.json')

  fs.readFile(configpath, (error, buffer) => {
    if (error) {
      log('config file was not found')
    } else {
      const configData = JSON.parse(buffer)

      const newConfigData = JSON.stringify({
        ...configData,
        ...newData
      }, null, '\t')
    
      fs.writeFile(configpath, newConfigData, err => {
        log(err.message)
      })
    }
  })
}

export const setOffsets = (action: string) => {
  if (action === 'reset') {
    const offsets = Array(4).fill(Array(16).fill(0))

    log('calibration has been reseted')

    writeToConfig({ offsets })

    return {
      type: SET_OFFSETS,
      offsets
    }
  }
  if (action === 'calibrate') {
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

    log('calibrated')

    writeToConfig({ offsets })

    return {
      type: SET_OFFSETS,
      offsets
    }
  }
}


export const comConnect = () => {
  const state: any = store.getState()

  const { portName } = state.data
  const comData = state.data.comData
  const oldPort = state.data.port
  if (oldPort && oldPort.isOpen) oldPort.close()

  const port = new SerialPort(portName, {
    baudRate: 115200,
  });


  const parser = port.pipe(new Readline());

  port.on('open', () => log(`connection is opened on ${portName}`));

  port.on('error', err => {
   log(`Error: ${err.message}`)
  })

  port.on('close', () => log(`connection on ${portName} is closed`))

  // const comData = {
  //   temperatures: null
  // }

  parser.on('data', data => {
    const state: any = store.getState()
    const {
      canvas,
      context,
      blur,
      range,
      offsets,
      highlighted,
      visualizingFunction,
      isFreezed
    } = state.data
    if (!isFreezed) {
      try {
        const temperatures = JSON.parse(data)
        comData.temperatures = temperatures
      } catch(e) {
      log(e.message)
      }
      requestAnimationFrame(() => drawPixels(
        canvas,
        context,
        comData.temperatures,
        offsets,
        highlighted,
        visualizingFunction,
        range[0], range[1],
        blur
      ))
    }
  });

  return {
    type: COM_CONNECT,
    port, 
    parser,
    comData
  }
}