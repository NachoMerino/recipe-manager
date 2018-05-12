import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* App is the entry point to the React code.*/
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
