import store from './store';
import { logToConsole } from './actions/data'


export const log = (message: string) => {
  
  store.dispatch(logToConsole(message))
}