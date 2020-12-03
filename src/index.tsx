import 'unfetch/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

const options = {
  // you can also just use 'bottom center'
  timeout: 5000,
  transition: transitions.SCALE,
};

console.log('APP_LAST_COMMIT: ', process.env.REACT_APP_VERSION);

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
