import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux' 
import thunk from 'redux-thunk'
import reducers from './store'

import './App.css';

import { Dashboard, Login } from './view'

const store = createStore(reducers, compose(
  applyMiddleware(thunk)
))

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route component={Dashboard}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
