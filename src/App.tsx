import React = require('react')
import { Provider } from 'react-redux'

import store from './store';
const Canvas = require('./components/canvas').default

// import { openSocket, changeNickname, showNicknameDialog } from './actions/chat'

const App = () => {

  return (
  <Provider store={store}>
    <div>HELLO WORLD</div>
    <Canvas></Canvas>
  </Provider>
  )
};


// class App extends React.Component<{}, {}> {
//   render() {
//     return (<div>hello world</div>)
//   }
// }

export default App
