import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Switch } from 'react-router-dom';
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ['Lato:100,200,300,400,500,600']
  }
});


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();