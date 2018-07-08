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
        let fullname = '';
        if (this.props.users.length === 0)
          return (<div>no users</div>)

        let users_list = [];
        for (let i=0; i<this.props.users.length; i++){
            fullname = this.props.users[i].fullname;
            users_list.push(
              <div>
                <div>{fullname}</div>
                <div>
                    <input type="submit" value="submit" onClick={event => this.props.update_user(123)}/>
                </div>
                <div>{this.props.tester}</div>
              </div>
            )
        }

        return <div>{users_list}</div>;
    }
}

const mapStateToProps = state => {
    return { users: state.users,
             tester: state.tester };
}

const mapDispatchToProps = dispatch => {
    return {
        get_users: (users) => {
            if (users.length !== 0)
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
            let data = {name: "cy",
                        fullname: "cy weisman",
                        password: "password"}
            ajaxPut("http://192.168.136.3:8000/users/123",
                    data,
                    function(data) {
                        dispatch({type: 'UPDATE_USER', payload: data});
                    },
                    function(xhr, textStatus, errorThrown) {
                        console.log("ERROR!!!!");
                    }
            );
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);

