import React from 'react'

// const styles = require('./App.css')
import './App.css'

const Canvas = require('./components/canvas').default
const ControlPannel = require('./components/controlPannel').default
const Console = require('./components/console').default
const Scale = require('./components/scale').default

const App = () => {
  return (
    <div className={'wrapper'}>
      <Scale />
      <div>
        <Canvas />
        <Console />
      </div>
      <ControlPannel />
    </div>
  )
};

export default App
