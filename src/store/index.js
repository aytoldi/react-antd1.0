import {createStore, applyMiddleware} from 'redux'
import reducers from './reducer'
import thunks from 'redux-thunk'

let store = createStore(reducers, applyMiddleware(thunks));
export default store;
