import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { user } from './reducer/user'
import { chatuser } from './reducer/chatuser'
import { chat } from './reducer/chat'

import thunk from 'redux-thunk'

const reducers = combineReducers({user, chatuser, chat})
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f=>f

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
  ))

export default store