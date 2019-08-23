import React = require('react')
import { Provider } from 'react-redux'

const styles = require('./App.css')

import store from './store';
const Canvas = require('./components/canvas').default
const ControlPannel = require('./components/controlPannel').default
const Console = require('./components/console').default


const App = () => {
  return (
  <Provider store={store} >
    <div className={styles.wrapper}>
      <div style={ { display: 'flex', flexWrap: 'wrap' } }>
        <Canvas />
        <Console />
      </div>
      <ControlPannel />
    </div>
  </Provider>
  )
};

export default App
