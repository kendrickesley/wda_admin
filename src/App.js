import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './NavBar';
import './App.css';
import LoginScreen from './LoginScreen';

class App extends Component {
  render() {
    return (
      <NavBar>
        <LoginScreen/>
      </NavBar>
    );
  }
}

export default App;
