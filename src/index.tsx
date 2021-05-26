import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import reportWebVitals from './reportWebVitals';

// # Redux
import { createStore , applyMiddleware } from 'redux' ;
import { Provider } from 'react-redux' ;
import thunk from 'redux-thunk';


// # CSS
import 'css/app.scss';
import 'css/style.scss';




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
