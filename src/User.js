import $ from "jquery";
import React from "react";
import {connect} from 'react-redux';
import {ajaxPut} from './common.js';

//const User = ({users, get_users}) => {
//    return (<div>{users[0].fullname}</div>);
//}


class User extends React.Component {
    componentDidMount() {
        this.props.get_users(this.props.users)
    }

    render() {
        if (Object.keys(this.props.users).length === 0)
          return (<div>no users</div>)

        let users_list = [];
        for (let user in this.props.users){
            users_list.push(
              <div>
                <div>{this.props.users[user].fullname}</div>
              </div>
            )
        }

        return <div>
            {users_list}
            <div>
                <input type="submit" value="submit" onClick={event => this.props.update_user(1)}/>
            </div>
          </div>;
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
            $.ajax("http://192.168.136.3:8000/users",
                {
                    success: function(data) {
                        dispatch({type: 'UPDATE_USERS', payload: data});
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        console.log("ERROR!!!!");
                    },
                    crossDomain: true
                }
            );
        },
        update_user: (user_id) => {
            let request_data = {name: "Ed",
                        fullname: "Ed Jones",
                        password: "password"};
            ajaxPut("http://192.168.136.3:8000/users/"+ user_id,
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

