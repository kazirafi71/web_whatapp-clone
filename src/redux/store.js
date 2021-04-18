import {applyMiddleware, createStore} from 'redux'
import rootReducer from './combineReducer'
import Thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';


const store=createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)))

export default store