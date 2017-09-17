import React, { Component } from 'react';

import './App.css';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import NavBar from './components/navbar';
import { ConnectedRouter, routerReducer, routerMiddleware, replace } from 'react-router-redux'
import LoginScreen from './screens/login';
import reducers from './redux/reducers' // Or wherever you keep your reducers
import {db as fireDB, auth} from './firebase';
import thunk from 'redux-thunk';
import {auth as reduxAuth, login as reduxLogin} from './redux/actions';
import {ticketList as ticketListRoute, 
  home as homeRoute, 
  login as loginRoute} from './routes';
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
const NonBlockNavBar = withRouter(NavBar);

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(thunk, middleware)
)

// Create an enhanced history that syncs navigation events with the store
class App extends Component {
  constructor(props){
    super(props);
    auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        store.dispatch(reduxAuth.setUser({
          email: user.email,
          uid: user.uid,
          name: user.displayName
        }));
        fireDB.ref('/admins/'+user.email.replace(/\./g, '%2E')).once('value', (snapshot) => {
          const val = snapshot.val();
          console.log(val);
          if(val && (val.position == 'hr' || val.position == 'technician')){
            store.dispatch(reduxAuth.setPosition(val.position));
            store.dispatch(reduxLogin.setLoading(false));
            store.dispatch(replace(homeRoute))
          }
        })
      } else {
        console.log('logged out');
        store.dispatch(reduxAuth.logout());
        store.dispatch(replace(loginRoute))
        // No user is signed in.
      }
    });
  }
  render() {
    return (
      <Provider store={store}>
      { /* ConnectedRouter will use the store from Provider automatically */ }
      <ConnectedRouter history={history}>
        <div>
          <Switch>
          <Route exact path="/" component={LoginScreen}/>
          <Route path="/app" component={() => <NonBlockNavBar store={store}/>}/>
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
    );
  }
}

export default App;
