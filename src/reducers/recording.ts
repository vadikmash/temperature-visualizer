import * as ACTIONS from '../actions/data'


const initialState = {
  recording: false,
  pausedRecording: false,
  finishedRecorging: false
}


const recording = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.START_RECORDING:
      return {
        ...state,
        recording: true,
        finishedRecorging: false,
        ...action.payload
      }
    case ACTIONS.PAUSE_RECORDING:
      return {
        ...state,
        pausedRecording: true
      }
    case ACTIONS.RESUME_RECORDING:
      return {
        ...state,
        pausedRecording: false,
        ...action.payload
      }
    case ACTIONS.FINISH_RECORDING:
      return {
        ...state,
        pausedRecording: false,
        recording: false,
        finishedRecorging: true
      }

    default:
      return state
  }
}

export default recording