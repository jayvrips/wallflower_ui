import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore } from 'redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
//import App from './App.js';
import User from './User.js';



function wallflowerReducer(state, action) {
    let initialState =  {
        users: {}
    };

    let users = null;
    switch (action.type) {
        case "INITIALIZE":
            return initialState;

        case "UPDATE_USERS":
            users = {users: action.payload};
            return {...state, ...users};

        case "UPDATE_USER":
            users = Object.assign({}, state.users);
            users[action.id] = action.user_data;
            return {...state, ...{users: users}};

        default:
            if (state === undefined)
                return initialState;
            else
                return state;
    }
}

const store = createStore(wallflowerReducer);

ReactDOM.render(
                <Provider store={store}>
                  <Router >
                    <Route exact path="/" component={User} />
                  </Router>
                </Provider>,
                document.getElementById('root'));

registerServiceWorker();

