import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Projects from './pages/Projects';
import Administration from './pages/Administration';
import TimeTracking from './pages/TimeTracking';
import Login from './pages/Login';
import { useAppSelector } from './hooks';
import Sidebar from './components/Sidebar';
import updateStore from './utils/validateToken';

function App() {
  const authInfo = useAppSelector((state) => state.authInfo);
  const token = sessionStorage.getItem('token');

  if (token) {
    updateStore(token);
  }

  return (
    <Router>
      { authInfo.isAuthenticated && <Sidebar />}
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route path="/login" component={Login} />

        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/timetracking" component={TimeTracking} />
        <PrivateRoute path="/projects" component={Projects} />
        <PrivateRoute path="/administration" component={Administration} />
      </Switch>
    </Router>
  );
}

export default App;
