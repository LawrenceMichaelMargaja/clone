import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from "history";

import { Button } from 'antd';
import { Router } from 'react-router-dom';

//redux
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import loginReducer from './store/reducers/login';
import deliveryReducer from './store/reducers/delivery';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootReducer = combineReducers({
  login: loginReducer,
  // user: userReducer,
  // product: productReducer,
  // coin: coinReducer,
  // apiResponseNotification: apiResponseNotificationReducer,
  // coinTransaction: coinTransactionsReducer,
  // transaction: transactionsReducer,
  // order: ordersReducer,
  // store: storeReducer,
  delivery: deliveryReducer,
  // withdrawal: withdrawalReducer,
  // analytics: analyticsReducer,
});

const store = createStore(
  rootReducer,
  compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
  ),
);

const hist = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={hist}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
