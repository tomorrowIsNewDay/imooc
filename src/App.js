import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux' 
import store from './store'

import './App.css';

import { Dashboard, Login, Register, BossInfo, GeniusInfo } from './view'

// 鉴权路由组件
import { 
  AuthRoute, 
  // PrivateRoute 
} from '@/component'

function NotFound(props){
  return (
    <h2> {props.match.params.location} : 页面404  </h2>
  )
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <AuthRoute />
          <Switch>
            {/* <PrivateRoute path='/dashboard' component={Dashboard}/> */}
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/bossinfo' component={BossInfo}></Route>
					  <Route path='/geniusinfo' component={GeniusInfo}></Route>
            <Route component={Dashboard}></Route>
            {/* <Route path='/:location' component={NotFound}/> */}
            {/* <Route path='/404' component={NotFound}/> */}
            {/* <Redirect to='/404'/> */}
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
