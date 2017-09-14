import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
/* START: ICONS */
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import HomeIcon from 'material-ui-icons/Home';
import ViewListIcon from 'material-ui-icons/ViewList';
/* END: ICONS */
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Route, Switch, Redirect } from 'react-router'
import HomeScreen from '../../screens/home';
import TicketListScreen from '../../screens/ticket-list';
import { push, replace } from 'react-router-redux'
import {ticketList as ticketListRoute, home as homeRoute} from '../../routes';
const drawerWidth = 240;
const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    marginTop: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  },
  drawerPaperClose: {
    width: 60,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.white,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  activeList:{
    backgroundColor: '#2196F3',
  },
  activeIcon:{
    color:"#FFFFFF"
  }
});

class NavBar extends Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  generateListItem = (route, name, icon, isHome = false) => {
    const Icon = icon;
    const { classes } = this.props;
    const currentRoute = this.props.store.getState().routing.location.pathname;
    var active = false;
    if(isHome){
      active = currentRoute == route || currentRoute == route + '/';
    }else{
      active = currentRoute.startsWith(route);
    }
    return (
      <ListItem className={active ? classes.activeList : null} 
      button 
      onClick={()=>{
        try{
          if(currentRoute !== route){
            this.props.store.dispatch(push(route))
          }
        }catch(e){
          this.props.store.dispatch(push(route))
        }
      }}>
        <ListItemIcon>
          <Icon className={active ? classes.activeIcon : null} />
        </ListItemIcon>
        <ListItemText 
        classes={active ? {
          text: classes.activeIcon
        } : null}
        primary={name} />
      </ListItem>
    )
  }

  checkAuth = ()=>{
    if(this.props.user == null){
      return false;
    }
    return true;
  }

  render(){
    const { classes } = this.props;
    return(
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar position="static" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
              <Toolbar disableGutters={!this.state.open}>
                <IconButton color="contrast" aria-label="Menu"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, this.state.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                  <Typography type="title" color="inherit" className={classes.flex} noWrap>
                  Title
                  </Typography>
                  <Button
                  onClick={()=>{
                    this.props.logout()
                  }}
                   color="contrast">Logout</Button>
              </Toolbar>
            </AppBar>
            
            <Drawer
              type="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <List className={classes.list}>
                  {this.generateListItem(homeRoute, "Dashboard", HomeIcon, true)}
                  {this.generateListItem(ticketListRoute, "Tickets", ViewListIcon)}
                </List>
              </div>
            </Drawer>
              <div className={classNames(classes.content, this.state.open && classes.contentShift)}>
                <Switch>
                  <Route exact path={homeRoute} render={() => {
                    if(this.checkAuth()){
                      return <HomeScreen/>
                    }else{
                      return <Redirect to="/"/>
                    }
                    }}/>
                  <Route exact path={ticketListRoute} render={() => {
                    if(this.checkAuth()){
                      return <TicketListScreen/>
                    }else{
                      return <Redirect to="/"/>
                    }
                    }}/>
                </Switch>
              </div>
            </div>
        </div>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NavBar);