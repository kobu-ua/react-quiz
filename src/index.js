import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store/store';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
