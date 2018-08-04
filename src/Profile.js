import React from "react";
import {connect} from 'react-redux';
import {fetchUsers} from './common.js'

class Profile extends React.Component {
    constructor(props){
      super(props);


    }

    componentDidMount() {
        this.props.get_users(this.props.users);
    }

    render(){
      if (Object.keys(this.props.users).length === 0)
        return <div/>;

      const user = this.props.users[this.props.match.params.id]
      return(
        <div className="col_container">
          <div><p>{user.name}</p></div>
          <div>
          <label htmlFor="summary">Summary: </label>
          <input type="text" id="name" ref={user.name}/>
          </div>

          <div>
          <label htmlFor="fullname">Full Name: </label>
          <input type="text" id="fullname" ref={user.fullname}/>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
   return { users: state.users };
}

const mapDispatchToProps = dispatch => {
  return {
    get_users: (users) => {fetchUsers(dispatch, users)}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
