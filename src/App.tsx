import React = require('react')

const styles = require('./App.css')

const Canvas = require('./components/canvas').default
const ControlPannel = require('./components/controlPannel').default
const Console = require('./components/console').default


const App = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Canvas />
        <Console />
      </div>
      <ControlPannel />
    </div>
  )
};

export default App
