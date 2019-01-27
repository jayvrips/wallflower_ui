import React from "react";
import {connect} from 'react-redux';
import {fetchProfiles} from './common.js';
import {Link} from "react-router-dom";


class Profiles extends React.Component {
    constructor(props) {
       super(props);
    }

    componentDidMount() {
        // create likes_notification component. Use case:
        //-DID 5 -7 BUT ONLY FOR PROFILE PAGE, NEED SESSIONS FOR IT TO APPEAR TROUGHOUT SITE
        //ON NAV PAGE
        //5. in notifications comp, mapStateToProps (to load them from redux store (see render in index.js))
        //6. add variable and case statement in redux store
        //7. write method for gettings notifications (checks state then makes ajax call if needed)
        //8. write method in dispatch for marking notifications as read (remember to think
            //its asyn or not (refresh the pg if you dont see update or navigate to new one))


        // create login component - use Flask features
        // show self on profiles list distinct from others
        // dont show edit stuff on profile pg if not you

        this.props.get_profiles(this.props.profiles);
    }

    render() {
        let profiles_list = [];
        if (Object.keys(this.props.profiles).length === 0)
          profiles_list = (<div>no profiles</div>)

        else{
            for (let profile in this.props.profiles){
                profiles_list.push(
                  <div>
                    <Link to={'/profile/' + this.props.profiles[profile].id}>{this.props.profiles[profile].user_fullname}</Link>
                  </div>
                );
            }
        }

        return (<div>
            {profiles_list}
          </div>);
    }
}

const mapStateToProps = state => {
    return { profiles: state.profiles };
}

const mapDispatchToProps = dispatch => {
    return {
        get_profiles: (profiles) => {fetchProfiles(dispatch, profiles)}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
