import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Projects from './pages/Projects';
import Administration from './pages/Administration';
import TimeTracking from './pages/TimeTracking';

function App() {
  const isAuthenticated = true;

  const MenuBar = withRouter(() => {
    if (isAuthenticated) {
      return (
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Mein Dashboard</Link>
              </li>
              <li>
                <Link to="/timetracking">Meine Zeiterfassung</Link>
              </li>
              <li>
                <Link to="/projects">Projekte</Link>
              </li>
              <li>
                <Link to="/administration">Administration</Link>
              </li>
              <li>
                <Link to="/singout">Ausloggen</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
    return null;
  });

  return (
    <Router>
      <MenuBar />
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
