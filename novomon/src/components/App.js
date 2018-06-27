import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ComputerIcon from '@material-ui/icons/Computer';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import HomeView from './../views/HomeView';
import TableView from './../views/TableView';
import MailReportView from './../views/MailReportView';
import PingView from './../views/PingView';
import LoginView from './../views/Login/LoginView';
import LoginView2 from './../views/Login/LoginView2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../store/modules/Auth';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  loginButton: {
    position: 'absolute',
    right: 20,
    fontSize: '1em'
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

const PrivateRoute = ({ component: Component, ...params }) => {
  return (
    <Route
      {...params}
      render={props => {
        return params.isLoginSuccess ? (
          <Redirect
            to={{ pathname: '/home', state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

class App extends Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLogout = () => {
    const { AuthActions, history } = this.props;
    AuthActions.setLoginStateAsync(false);
    history.push('/');
  };

  render() {
    const { classes, theme, isLoginSuccess } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
          color="primary"
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              noWrap
              component={Link}
              to="/"
            >
              SERMON
            </Typography>
            {isLoginSuccess ? (
              <IconButton
                color="inherit"
                aria-label="login"
                className={classNames(classes.loginButton)}
                onClick={this.handleLogout}
              >
                Logout
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="login"
                component={Link}
                to="/login"
                className={classNames(classes.loginButton)}
              >
                Login
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button component={Link} to="/hosts">
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary="Hosts" />
            </ListItem>
            <ListItem button component={Link} to="/mail-report">
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Mail Report" />
            </ListItem>
            <ListItem button component={Link} to="/ping">
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="Ping" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/hosts" component={TableView} />
            <Route path="/mail-report" component={MailReportView} />
            <Route path="/ping" component={PingView} />
            <PrivateRoute
              path="/login"
              component={LoginView}
              isLoginSuccess={isLoginSuccess}
            />
            <Route path="/" component={HomeView} />
          </Switch>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

// store의 state를 props로 가져오기
const mapStateToProps = state => {
  return { isLoginSuccess: state.Auth.isLoginSuccess };
};

// action을 props로 가져오기
const mapDispatchToProps = dispatch => ({
  AuthActions: bindActionCreators(authActions, dispatch)
});

// connect HOC을 이용하여 적용
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(App));
