import React, { Component } from 'react';
import { Card } from 'antd';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const gridStyle = {
      width: '33%',
      textAlign: 'center',
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">HackIllinois 2018 Instanbul</h1>
        </header>
        <Card>
          <Card.Grid style={gridStyle}>Uses headless Google Chrome and Istanbul to diagnose frontend code coverage</Card.Grid>
          <Card.Grid style={gridStyle}>Generate coverage reports for your projects in the cloud</Card.Grid>
          <Card.Grid style={gridStyle}>One more thing</Card.Grid>
        </Card>
        <textarea rows="4" cols="100">
        

        </textarea>
      </div>
    );
  }
}

export default App;
