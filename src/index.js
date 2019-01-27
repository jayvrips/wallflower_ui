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
import ChatHistory from './ChatHistory.js'
import Layout from './Layout.js'



function wallflowerReducer(state, action) {
  //yeah, you prob thinking that we didnt pass in state just acion, but redux did that when dispatch was called
  //(it calls this function and passes state)
    let initialState =  {
        users: {},
        profiles: {},
        profile_chats : {},
        profile_likes: {}
    };

    let users = null;
    let profiles = null;
    let profile_chats = null;
    let profile_likes = null;
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
            return {...state, ...{profiles: profiles}};

        case "UPDATE_PROFILE_CHATS":
            profile_chats = {profiles_chats: action.payload};
            return {...state, ...profile_chats};

        case "UPDATE_PROFILE_LIKES":
            profile_likes = {profile_likes: action.payload};
            return {...state, ...profile_likes};

        case "DELETE_PROFILE":
        //so to update the store you have to make a copy of whatecer it is your gonna mess with
        //cuz u cant mess with stuff directly. in this case, we gonna mess with the profiles
            profiles = Object.assign({}, state.profiles);
            delete profiles[action.id];
            return {...state, ...{profiles: profiles}};



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
                      <Layout />
                      <Route exact path="/" component={Profiles} />
                      <Route exact path="/users" component={User} />
                      <Route path='/profile/:id' component={Profile} />
                      <Route path='/chathistory/:id/:recipient_id' component={ChatHistory} />
                    </div>
                  </Router>
                </Provider>,
                document.getElementById('root'));

registerServiceWorker();
