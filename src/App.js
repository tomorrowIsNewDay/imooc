import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux' 
import store from './store'

import './App.css';

import { Dashboard, Login } from './view'

// function NotFound(props){
//   return (
//     <h2>NotFound {props.match.params.location}</h2>
//   )
// }
function NotFound1(){
  return (
    <h2>NotFound </h2>
  )
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/dashboard' component={Dashboard}/>
            {/* <Route path='/:location' component={NotFound}/> */}
            <Redirect to='/404' component={NotFound1}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
