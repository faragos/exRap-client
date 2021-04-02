import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Projects from './pages/Projects';
import Administration from './pages/Administration';
import TimeTracking from './pages/TimeTracking';

function App() {
  const isAuthenticated = true;

  return (
    <Router>
      {isAuthenticated && <Sidebar />}
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
