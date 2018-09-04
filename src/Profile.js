import React from "react";
import {connect} from 'react-redux';
import {fetchProfiles} from './common.js';
import {dropdown} from './Widgets.js';
import {ajaxPut} from './common.js';

const height_dict = {
  "under_5": "Peter Dinklage",
  "small_5": "Kevin Hart",
  "medium_5": "Paul Rudd",
  "average_5": "Tom Hardy",
  "tall_dude": "Chris Hemsworth",
  "giant": "Lee Pace"
};
const networth_dict = {
  "poor": "poor",
  "average": "average",
  "above_average": "gentrified",
  "well_off": "6-figure-club",
  "rich": "big little lies",
  "one_percent": "one-percent",
}
class Profile extends React.Component {
    constructor(props){
      super(props);

      this.state= {
        height_id: null,
        networth_id: null
      }
    }

    componentDidMount() {
        this.props.get_profiles(this.props.profiles);
    }

    onHeightChange(height_id){
      this.setState({height_id: height_id})
    }

    onNetworthChange(networth_id){
      this.setState({networth_id: networth_id})
    }

    render(){
      let self = this;
      if (Object.keys(this.props.profiles).length === 0)
        return <div/>;

      const profile = this.props.profiles[this.props.match.params.id];

      let height_id = this.state.height_id;
      let networth_id = this.state.networth_id;

      if (!height_id)
        height_id = profile.height_id

      if (!height_id)
        height_id = 'medium_5'

      if (!networth_id)
        networth_id = profile.networth_id

      if (!networth_id)
        networth_id = 'one_percent'

      let height_dropdown = dropdown(height_dict, height_id, this.onHeightChange.bind(this));
      let networth_dropdown = dropdown(networth_dict, networth_id, this.onNetworthChange.bind(this));

      return(
        <div className="col_container">
          <div><p>{profile.id}</p></div>
          <div>
          <label htmlFor="height">Height: </label>
          {height_dropdown}
          </div>

          <div>
          <label htmlFor="networth">networth: </label>
          {networth_dropdown}
          </div>
          <button onClick={()=> {self.props.updateProfile(self.state, profile.id)}}>Submit</button>
        </div>
      );
    }
}

const mapStateToProps = state => {
   return { profiles: state.profiles };
}

const mapDispatchToProps = dispatch => {
  return {
    get_profiles: (profiles) => {fetchProfiles(dispatch, profiles)},


    updateProfile: (profile, profile_id) => {update_profile(dispatch, profile, profile_id)}
  };
}

function update_profile(dispatch, profile, profile_id){
    let request_data = {
        height: profile.height_id,
        networth: profile.networth_id
    }
    ajaxPut("/profile/" + profile_id,
            request_data,
            //rest call returns updated/new user
            //this anonymous function takes that data, and calls
            //dispatch function to put in redux store
            function(response_data) {
                dispatch({type: 'UPDATE_PROFILE', id: response_data['id'], profile_data: response_data});
            },
            function(xhr, textStatus, errorThrown) {
                console.log("ERROR!!!!");
            }
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
