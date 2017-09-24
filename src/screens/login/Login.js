import React, { Component } from 'react';

//Material UI Helper
import { withStyles } from 'material-ui/styles';

//Material UI Components
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { CircularProgress } from 'material-ui/Progress';

//Custom components
import * as backgroundImage from './background.jpg';
import './Login.css';

//styles for the page
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
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
    display:'flex',
    overflow:'hidden'
  },
  icon:{
    color:'#FFFFFF'
  },
  button_icon: {
    paddingTop:10,
    paddingBottom:10,
    paddingRight: 10,
    fontSize: '1.3em'
  },
  googleButton:{
    backgroundColor:'#dd4b39',
    color: '#FFFFFF',
    fontSize: '1.3em'
  },
  facebookButton:{
    backgroundColor:'#3B5998',
    color: '#FFFFFF',
    fontSize: '1.3em'
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

  //Render facebook and google login button
  renderLoginButton(classes){
    return (
      <Grid align='center' container spacing={24}>
        <Grid item xs={12} md={12} className={classes.text_center}>
          <Button
              className={classes.googleButton}
              onClick={this.props.googleClicked}
              raised={true}
          >
          <Icon className={classes.icon + " fa fa-google-plus " + classes.button_icon}/>
            <Typography style={{color:'#FFFFFF'}} type="title">
            Sign in with Google
            </Typography>
          </Button>
          <br/>
          <br/>
          <Typography style={{color:'#FFFFFF'}} type="title">
            or
          </Typography>
          <br/>
          <Button
              className={classes.facebookButton}
              onClick={this.props.facebookClicked}
              raised={true}
          >
          <Icon className={classes.icon + " fa fa-facebook " + classes.button_icon}/>
            <Typography style={{color:'#FFFFFF'}} type="title">
            Sign in with Facebook
            </Typography>
          </Button>
          {this.props.error ? 
            <Typography type="body2" gutterBottom style={{color:'#fc1414'}}>
            Whoops! you are not allowed to login!
            </Typography>:null
          }
        </Grid>
      </Grid>
    )
  }

  //render the login screen
  render() {
    const classes = this.props.classes;
    return (
      <div className="App" className={classes.background}>
          <Grid align='center' container spacing={24}>
            {/* <Grid item xs={12}>
              <Typography type="headline" component="h1" style={{color:'#FFFFFF', textAlign:'center'}}>Login</Typography>
            </Grid> */}
            <Grid item xs={12}>
              <Grid container align='center' justify='center'>
              {this.props.loading ?  <CircularProgress size={150} /> : this.renderLoginButton(classes)}
              </Grid>
            </Grid>  
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Login);