import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
