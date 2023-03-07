import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLayout from "./layout";

import Auth from './Auth';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Auth>
                    <AppLayout/>
                </Auth>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
