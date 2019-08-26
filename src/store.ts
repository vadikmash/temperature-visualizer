import { createStore, combineReducers } from 'redux'
const data = require('./reducers/data').default


const reducer = combineReducers({ data });

const store = createStore(reducer);

export default store;