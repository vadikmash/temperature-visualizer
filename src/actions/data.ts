export const SET_BLUR = 'SET_BLUR'
export const SET_RANGE = 'SET_RANGE'
export const SET_COMPORT = 'SET_COMPORT'
export const SET_VISUALIZER = 'SET_VISUALIZER'
export const SET_AVALIABLE_PORTS = 'SET_AVALIABLE_PORTS'


export const setAvaliablePorts = (ports) => (
  {
    type: SET_AVALIABLE_PORTS,
    ports
  }
)

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

export const setPort = (port: string) => (
  {
    type: SET_COMPORT,
    port
  }
)

export const setVisualizer = (visualizer: string) => (
  {
    type: SET_VISUALIZER,
    visualizer
  }
)