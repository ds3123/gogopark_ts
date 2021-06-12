import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// # Redux
import { createStore , applyMiddleware } from 'redux' ;
import { Provider } from 'react-redux' ;
import thunk from 'redux-thunk';
import root_Reducer from "store/reducers/root_Reducer";

// # CSS
import 'css/app.scss';
import 'css/style.scss' ;


const store = createStore( root_Reducer , applyMiddleware( thunk ) );

ReactDOM.render(
                  <Provider store = { store } >

                      <ToastContainer
                          position="bottom-left"
                          autoClose={5000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                      />

                    <React.StrictMode> <App /> </React.StrictMode >
                  </Provider> ,
                  document.getElementById('root')
               ) ;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
