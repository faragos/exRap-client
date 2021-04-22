import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
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

  return (
    <Router>
      { authInfo.isAuthenticated && <Sidebar />}
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;
