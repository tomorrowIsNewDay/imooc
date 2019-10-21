import React from 'react';
import { Button } from 'antd-mobile'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Button type='primary'>learn react</Button>
        <Button type='primary'>bingo</Button>
      </header>
    </div>
  );
}

export default App;
