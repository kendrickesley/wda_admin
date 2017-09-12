import React, { Component } from 'react';
import './LoginScreen.css';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import * as backgroundImage from './background.jpg';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: '20 auto',
    float:'none',
    alignItems:'center'
  }),
  background:{
    backgroundImage:`url(${backgroundImage})`, 
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat', 
    backgroundPosition: 'center center', 
    height:'100vh', 
    marginTop:-21,
    padding: 30,
    alignItems:'center',
    display:'flex'
  },
  icon:{
    color:'#FFFFFF'
  },
  googleButton:{
    backgroundColor:'#dd4b39'
  }
});

class LoginScreen extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className="App" className={classes.background}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography type="headline" component="h1" style={{color:'#FFFFFF', textAlign:'center'}}>Login</Typography>
            </Grid>
            <Grid item md={2} lg={3}/>
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={classes.root} elevation={4}>
                  <Grid container spacing={24}>
                    <Grid item xs={12} md={6}>
                      <IconButton
                          className={classes.googleButton}
                          onClick={()=>{}}
                          raised={true}
                      >
                      <Icon className={[classes.icon, "fa fa-google-plus"]}/>
                      <Typography className={classes.icon} component="label">Sign in with Google</Typography>
                      </IconButton>
                    </Grid>
                  </Grid>
                <Typography className={classes.icon} type="body1" component="p">
                  Paper can be used to build surface or other elements for your application.
                </Typography>
              </Paper>
            </Grid>  
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(LoginScreen);