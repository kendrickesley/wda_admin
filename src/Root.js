import React, { Component } from 'react';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
const theme = createMuiTheme({
    palette: {
        primary: blue
    }
});
class Root extends Component {
    
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <App/>
      </MuiThemeProvider>
    );
  }
}

export default Root;
