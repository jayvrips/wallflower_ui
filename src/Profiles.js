import React from "react";
import {connect} from 'react-redux';
import {ajaxGet, ajaxPost, ajaxPut, fetchProfiles} from './common.js';
import {Link} from "react-router-dom";


class Profiles extends React.Component {
    constructor(props) {
       super(props);
    }

    componentDidMount() {
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
                    <Link to={'/profile/' + this.props.profiles[profile].id}>{this.props.profiles[profile].height}</Link>
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
