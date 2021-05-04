import React, { ReactElement } from 'react';
import './Sidebar.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Link,
  Route,
  Redirect, Switch, useHistory,
} from 'react-router-dom';
import { clearUser } from '../store/authInfo/reducers';
import { useAppDispatch } from '../hooks';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import TimeTracking from '../pages/TimeTracking';
import Projects from '../pages/Projects';
import Administration from '../pages/Administration';
import logo from '../assets/exRap-logo.svg';
import NotFound from '../pages/NotFound';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    boxSizing: 'border-box',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

type Page = {
  uri: string,
  label: string,
  icon: ReactElement,
};

interface NavigationAction {
  label: string,
  icon: ReactElement,
  fn: () => void,
}

export default function ResponsiveDrawer() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleSignout = () => {
    dispatch(clearUser());
    history.push('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pages : Page[] = [
    { uri: '/dashboard', label: 'Mein Dashboard', icon: <DashboardIcon /> },
    { uri: '/timetracking', label: 'Meine Zeiterfassung', icon: <AccessTimeIcon /> },
    { uri: '/projects', label: 'Projekte', icon: <AccountTreeIcon /> },
    { uri: '/administration', label: 'Administration', icon: <SettingsIcon /> },
  ];

  const secondaryPages : NavigationAction[] = [
    { fn: handleSignout, label: 'Ausloggen', icon: <ExitToAppIcon /> },
  ];

  const drawer = (
    <div>
      <div className="logo-container">
        <img src={logo} alt="Logo exRap" className="logo" />
      </div>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem button to={page.uri} component={Link} key={page.uri}>
            <ListItemIcon>
              {page.icon}
            </ListItemIcon>
            <ListItemText primary={page.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryPages.map((page) => (
          <ListItem button onClick={page.fn} key={page.label}>
            <ListItemIcon>
              {page.icon}
            </ListItemIcon>
            <ListItemText primary={page.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window.document.body;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />

          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/timetracking" component={TimeTracking} />
          <PrivateRoute path="/projects" component={Projects} />
          <PrivateRoute path="/administration" component={Administration} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}
