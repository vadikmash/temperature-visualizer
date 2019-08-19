import React = require('react')
import { Provider } from 'react-redux'

let store = require('./store');
store = store.default;

// import { openSocket, changeNickname, showNicknameDialog } from './actions/chat'

const App = () => {

  return (
  <Provider store={store}>
    <div>HELLO WORLD</div>
  </Provider>
  )
};


// class App extends React.Component<{}, {}> {
//   render() {
//     return (<div>hello world</div>)
//   }
// }

export default App
