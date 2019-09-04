const React = require('react')



const styles = require('./App.css')

const Canvas = require('./components/canvas').default
const ControlPannel = require('./components/controlPannel').default
const Console = require('./components/console').default
const Scale = require('./components/scale').default

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Scale />
      <div>
        {/* <Canvas /> */}
        <Console />
      </div>
      <ControlPannel />
    </div>
  )
};

export default App
