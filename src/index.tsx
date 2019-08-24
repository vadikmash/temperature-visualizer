require('css-modules-require-hook')({
  processCss: css => {
    let style = document.createElement('style')
    style.innerHTML = css
    document.head.appendChild(style)
  }
})

const React = require('react');
const ReactDOM = require('react-dom')
import { Provider } from 'react-redux'
import store from './store';

const App = require('./App').default


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
