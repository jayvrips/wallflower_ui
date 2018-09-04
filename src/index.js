import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore } from 'redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
//import App from './App.js';
import User from './User.js';
import Profile from './Profile.js';
import Profiles from './Profiles.js'



function wallflowerReducer(state, action) {
    let initialState =  {
        users: {},
        profiles: {}
    };

    let users = null;
    let profiles = null;
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

        case "UPDATE_PROFILES":
            profiles = {profiles: action.payload};
            return {...state, ...profiles};

        case "UPDATE_PROFILE":
        //state is the store
            profiles = Object.assign({}, state.profiles);
        //action is the stuff we passed in dispatch, so action.id is profile_id
            profiles[action.id] = action.profile_data;
            return {...state, ...{profiles: profiles}}


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
                    <div>
                      <Route exact path="/" component={User} />
                      <Route exact path="/profiles" component={Profiles} />
                      <Route path='/profile/:id' component={Profile} />
                    </div>
                  </Router>
                </Provider>,
                document.getElementById('root'));

registerServiceWorker();
