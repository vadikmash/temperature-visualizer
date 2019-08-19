import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import thunkMiddleware from 'redux-thunk';
// import chat from './reducers/chat'

const initialState = {}

const temperatures = (state = initialState, action) => {
  return state;
}

// const middleWares = [thunkMiddleware];

// const enhancer = composeEnhancers(applyMiddleware(...middleWares));

const reducer = combineReducers({ temperatures });

const store = createStore(reducer);

export default store;