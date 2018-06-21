import $ from "jquery";
import React from "react";
import {connect} from 'react-redux';

class User extends React.Component {
    componentDidMount() {
        this.props.get_users(this.props.users)
    }

    render() {
        let fullname = '';
        if (this.props.users.length > 0)
            fullname = this.props.users[0].fullname;

        return (<div>{fullname}</div>);
    }
}

//const User = ({users, get_users}) => {
//    return (<div>{users[0].fullname}</div>);
//}

/*
class User extends React.Component {
    constructor(props) {
        super(props);

/*
        this.state = {
            users: props.users
        };
* /
    }

    componentDidMount() {
        // try to get users from the store
        this.setState({users: store.dispatch({type: "GET_USERS"})});
        
    }

    render() {
        var stuff = "Nothing yet";
        if (this.state.users)
            stuff = "Name: " + this.state.users[0].fullname;

        return (<div>{stuff}</div>);
    }
}
*/

const mapStateToProps = state => {
    return { users: state.users };
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
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(User);

