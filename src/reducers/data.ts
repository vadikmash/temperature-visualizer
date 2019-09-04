import * as ACTIONS from '../actions/data'
import * as visualizers from '../visualizers'

const initialState = {
  portName: '',
  port: null,
  parser: null,
  avaliablePorts: [],
  visualizer: 'BW',
  visualizingFunction: visualizers.blackAndWhite,
  range: [20, 36],
  blur: 0,
  canvas: null,
  canvasSize: { height: 0, width: 0 },
  pixelSize: 48,
  context: null,
  offsets: Array(4).fill(Array(16).fill(0)),
  highlighted: Array(4).fill(Array(16).fill(false)),
  comData: { temperatures: null },
  hintIsVisible: false,
  mousePosition: { posX: 0, poxY: 0 },
  hoverPixel: { x: null, y: null },
  hoverTemperature: null,
  pannels: null,
  hoverPannel: '',
  displayMode: 'pixel',
  dirs: {
    workdir: '',
    photodir: '',
    recorddir: ''
  },
  recording: false,
  finishedRecorging: false,
  logMessages: ['visualizer is running...']
}


const data = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOG_TO_CONSOLE:
      return {
        ...state,
        logMessages: [...state.logMessages, action.message]
      }
    case ACTIONS.INIT_WORKDIR:
      return {
        ...state,
        dirs: action.dirs
      }
    case ACTIONS.SET_DISPLAYMODE:
      return {
        ...state,
        displayMode: action.mode
      }
    case ACTIONS.FLUSH_DATA:
      if (data) {
        return {
          ...state,
          ...action.data
        }
      }
      return state
    case ACTIONS.SHOW_HINT:
      return {
        ...state,
        hintIsVisible: true,
        hoverTemperature: action.hoverTemperature,
        hoverPixel: action.hoverPixel,
        highlighted: action.highlighted,
        mousePosition: action.mousePosition,
        hoverPannel: action.hoverPannel
      }
    case ACTIONS.HIDE_HINT:
      return {
        ...state,
        hintIsVisible: false,
        highlighted: action.highlighted,
      }
    case ACTIONS.SET_BLUR:
      return {
        ...state,
        blur: action.blur
      }  
      case ACTIONS.SET_PORT_NAME:
        return {
          ...state,
          portName: action.portName
        }  
      case ACTIONS.SET_VISUALIZER:
        let visualizingFunction
        switch (action.visualizer){
          case 'BW': 
            visualizingFunction = visualizers.blackAndWhite
          break
          case 'RGB': 
            visualizingFunction = visualizers.RGB
          break 
          case 'RB':
            visualizingFunction = visualizers.RedAndBlue
          break;
          default:
            visualizingFunction = visualizers.blackAndWhite
        }
        return {
          ...state,
          visualizer: action.visualizer,
          visualizingFunction
        }  
      case ACTIONS.SET_BLUR:
        return {
          ...state,
          blur: action.blur
        }  
      case ACTIONS.SET_OFFSETS:
        return {
          ...state,
          offsets: action.offsets
        }  
      case ACTIONS.SET_RANGE:
        return {
          ...state,
          range: action.range
        }  
      case ACTIONS.SET_AVALIABLE_PORTS:
        return {
          ...state,
          avaliablePorts: action.ports
        } 
      case ACTIONS.SET_CANVAS:
        return {
          ...state,
          canvas: action.canvas,
          context: action.context
        } 
      case ACTIONS.COM_CONNECT:
        return {
          ...state,
          port: action.port,
          parser: action.parser,
          comData: action.comData
        } 
    default:
      return state
  }
}

export default data