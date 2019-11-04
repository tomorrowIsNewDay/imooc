import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { user } from './reducer/user'

import thunk from 'redux-thunk'

const reducers = combineReducers({user})

const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))

export default store