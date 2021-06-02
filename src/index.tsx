import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import reportWebVitals from './reportWebVitals';


// # Redux
import { createStore , applyMiddleware } from 'redux' ;
import { Provider } from 'react-redux' ;
import thunk from 'redux-thunk';
import root_Reducer from "store/reducers/root_Reducer";

// # CSS
import 'css/app.scss';
import 'css/style.scss' ;


const store = createStore( root_Reducer , applyMiddleware( thunk ) );

ReactDOM.render(  <Provider store = { store } >
                   {/* 因 Redux-Form，嚴格模式下會出現警告 --> 暫時移除 <React.StrictMode> 2021.06.03 */}
                   <App />
                  </Provider> ,
                  document.getElementById('root')
               ) ;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
