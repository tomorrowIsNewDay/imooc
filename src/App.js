import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux' 
import store from './store'

import './App.css';

import { Dashboard, Login } from './view'

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
