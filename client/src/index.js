import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* App is the entry point to the React code.*/
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
