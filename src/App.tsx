import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Redirect,
  Route, Switch,
} from 'react-router-dom';
import Login from './pages/Login';
import { useAppSelector } from './hooks';
import Sidebar from './components/Sidebar';
import updateStore from './utils/validateToken';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

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
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
