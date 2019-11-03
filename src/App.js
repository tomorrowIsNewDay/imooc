import React from 'react';
import { Button } from 'antd-mobile'
// import logo from './logo.svg';
import './App.css';

import { Login } from './component'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Login txt={'😯'}>
        <p>你看看</p>
        </Login>  
        <Button type='primary'>learn react</Button>
        <Button type='primary'>bingo</Button>
      </header>
    </div>
  );
}

export default App;
