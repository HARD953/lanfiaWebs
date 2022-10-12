import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import {BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';

import 'rsuite/dist/rsuite.min.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import store from './redux/store'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

AOS.init();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
