import { createStore, combineReducers } from 'redux'
const data = require('./reducers/data').default
const recording = require('./reducers/recording').default


const reducer = combineReducers({ data, recording });

const store = createStore(reducer);

export default store;