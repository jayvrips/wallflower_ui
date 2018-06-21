import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore } from 'redux';
//import ReduxPromise from 'redux-promise';
//import thunk from 'redux-thunk';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
//import routes from './routes.js';
//import App from './App.js';
import User from './User.js';



function wallflowerReducer(state, action) {
    let initialState =  {
        blah: "hello there",
        users: []
    };

    switch (action.type) {
        case "INITIALIZE":
            return initialState;

        case "UPDATE_USERS":
            let users = {users: action.payload};
            return {...state, ...users};

        default:
            if (state === undefined)
                return initialState;
            else
                return state;
    }
}

//const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore)
const store = createStore(wallflowerReducer);

ReactDOM.render(
                <Provider store={store}>
                  <Router >
      <Route exact path="/" component={User} />
                  </Router>
                </Provider>,
                document.getElementById('root'));

registerServiceWorker();

