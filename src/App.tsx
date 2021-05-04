import React from 'react';
import {
  BrowserRouter as Router, Redirect,
  Route, Switch,
} from 'react-router-dom';
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

  let comp;
  if (authInfo.isAuthenticated) {
    comp = <Sidebar />;
  } else {
    comp = <Redirect to="/login" />;
  }
  return (
    <Router>
      {comp}
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
