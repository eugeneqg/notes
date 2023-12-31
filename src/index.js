import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import { BrowserRouter as Router }  from "react-router-dom";
import App from './app/App';
import {Provider} from "react-redux";
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>

);
