import React from "react";
import {connect} from 'react-redux';
import {ajaxGet, ajaxPost, ajaxPut} from './common.js';
import {Link} from "react-router-dom";

//const User = ({users, get_users}) => {
//    return (<div>{users[0].fullname}</div>);
//}


//RENAME TO USER SETTINGS//
//KEEP FORM BUT MOVE LIST TO PROFILES COMPNENT AND HAVE IT USE PROFILES props
//ON SUBMIT OF FORM, REDIRECT TO PROFILE PAGE
class User extends React.Component {
    constructor(props) {
       super(props);

       this.user = {
           name: React.createRef(),
           fullname: React.createRef(),
           password: React.createRef()
       }
    }

/*
    onFieldChange(field, value) {
       let new_state = {};
       new_state[field] = value;
       this.setState(new_state);list = (<div>no profiles</div>)

        else{
            for (let profile in this.props.profiles){
                profiles_list.push(
                  <div>
                    <Link to={'/profile/' + this.props.profiles[profile].id}>{this.props.profiles[profile].height}</Link>
                  </div>
    }
*/

    componentDidMount() {
        this.props.get_users(this.props.users);
    }

    renderForm() {
        let self = this;

	return(<div className="col_container">
            <div>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" ref={this.user.name}/>
            </div>

            <div>
            <label htmlFor="fullname">Full Name: </label>
            <input type="text" id="fullname" ref={this.user.fullname}/>
            </div>

            <div>
            <label htmlFor="password">Password: </label>
            <input type="text" id="password" ref={this.user.password}/>
            </div>

            <div>
                <input type="submit" value="submit" onClick={() => self.props.add_user(self.user)}/>
            </div>
        </div>);
    }

    render() {
        let users_list = [];
        if (Object.keys(this.props.users).length === 0)
          users_list = (<div>no users</div>)

        else{
            for (let user in this.props.users){
                users_list.push(
                  <div>
                    <Link to={'/profile/' + this.props.users[user].profile_id}>{this.props.users[user].fullname}</Link>
                  </div>
                )
            }
        }

        return (<div>
            {users_list}
            {this.renderForm()}
          </div>);
    }
}

const mapStateToProps = state => {
    return { users: state.users };
}

const mapDispatchToProps = dispatch => {
    return {
        get_users: (users) => {
            if (Object.keys(users).length !== 0)
                return;
            ajaxGet("/users",
                function(data) {
                    dispatch({type: 'UPDATE_USERS', payload: data});
                },
                function(xhr, textStatus, errorThrown) {
                    console.log("ERROR!!!!");
                }
            );
        },
        add_user: (user) => {
            let request_data = {
                name: user.name.current.value,
                fullname: user.fullname.current.value,
                password: user.password.current.value
            }
            ajaxPost("/user",
                    request_data,
                    //rest call returns updated/new user
                    //this anonymous function takes that data, and calls
                    //dispatch function to put in redux store
                    function(response_data) {
                        dispatch({type: 'UPDATE_USER', id: response_data['id'], user_data: response_data});
                    },
                    function(xhr, textStatus, errorThrown) {
                        console.log("ERROR!!!!");
                    }
            );
        },
        update_user: (user_id) => {
            let request_data = {name: "Ed",
                        fullname: "Ed Jones",
                        password: "password"};
            ajaxPut("/users/"+ user_id,
                    request_data,
                    //rest call returns updated/new user
                    //this anonymous function takes that data, and calls
                    //dispatch function to put in redux store
                    function(response_data) {
                        dispatch({type: 'UPDATE_USER', id: user_id, user_data: response_data});
                    },
                    function(xhr, textStatus, errorThrown) {
                        console.log("ERROR!!!!");
                    }
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);
