import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';
import ReduxExample from './pages/ReduxExample';
import OpenAPI from './pages/OpenAPI';
// import ButtonGroup from './components/ButtonGroup';
// import Button from './components/Button';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />

      <Calendar />
      <ReduxExample />
      <OpenAPI />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;
