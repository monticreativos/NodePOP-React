import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import { BrowserRouter as Router } from 'react-router-dom';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);
// console.log(process.env.REACT_APP_API_BASE_URL)
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App isInitiallyLogged={!!accessToken} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
