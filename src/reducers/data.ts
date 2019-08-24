import ACTIONS = require('../actions/data')
import visualizers = require('../visualizers')


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
  context: null
}


const data = (state = initialState, action) => {
  switch (action.type) {
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
          case 'R': 
            visualizingFunction = visualizers.red
          break
          case 'G': 
            visualizingFunction = visualizers.green
          break
          case 'B': 
            visualizingFunction = visualizers.blue
          break 
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
          parser: action.parser
        } 
    default:
      return state
  }
}

export default data