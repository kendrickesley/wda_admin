import React, { Component } from 'react';
import './Login.css';
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
    height:'100%', 
    width:'100%',
    position:'absolute',
    alignItems:'center',
    display:'flex'
  },
  icon:{
    color:'#FFFFFF'
  },
  button_icon: {
    paddingRight: 10
  },
  googleButton:{
    backgroundColor:'#dd4b39',
    color: '#FFFFFF'
  },
  facebookButton:{
    backgroundColor:'#3B5998',
    color: '#FFFFFF'
  },
  text_right:{
    textAlign: 'right'
  },
  text_center:{
    textAlign:'center'
  }
});

class Login extends Component {
  constructor(props){
    super(props);
    console.log(props)
  }

  renderLoginButton(classes){
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={6} className={classes.text_center}>
          <Button
              className={classes.googleButton}
              onClick={this.props.googleClicked}
              raised={true}
          >
          <Icon className={classes.icon + " fa fa-google-plus " + classes.button_icon}/>
          Sign in with Google
          </Button>
        </Grid>
        <Grid item xs={12} md={6} className={classes.text_center}>
          <Button
              className={classes.facebookButton}
              onClick={()=>{}}
              raised={true}
          >
          <Icon className={classes.icon + " fa fa-facebook " + classes.button_icon}/>
          Sign in with Facebook
          </Button>
        </Grid>
      </Grid>
    )
  }
  render() {
    const classes = this.props.classes;
    return (
      <div className="App" className={classes.background}>
          <Grid container spacing={24}>
            {/* <Grid item xs={12}>
              <Typography type="headline" component="h1" style={{color:'#FFFFFF', textAlign:'center'}}>Login</Typography>
            </Grid> */}
            <Grid item md={2} lg={3}/>
            <Grid item xs={12} md={8} lg={6}>
              {this.props.loading ? null : this.renderLoginButton(classes)}
            </Grid>  
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Login);