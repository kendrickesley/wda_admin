import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar';
import './App.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import LoginScreen from './screens/login/LoginScreen';
//import reducers from './reducers' // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)


const store = createStore(
  combineReducers({
    routing: routerReducer
  }),
  applyMiddleware(middleware)
)

// Create an enhanced history that syncs navigation events with the store
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <div>
          <Switch>
          <Route exact path="/" component={LoginScreen}/>
          <Route path="/home" component={() => <NavBar store={store}/>}/>
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
    );
  }
}

export default App;
