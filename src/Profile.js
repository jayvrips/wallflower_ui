import React from "react";
import {connect} from 'react-redux';
import {fetchProfiles} from './common.js';
import {dropdown} from './Widgets.js';
import {ajaxPut, ajaxGet} from './common.js';
import {Redirect} from 'react-router';
import {Link} from "react-router-dom";

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
        profile: null,
        redirect: null,
        profile_data: {},
        chat_list: {}
      }
    }

    componentDidMount() {
      //Notes 1: things you want to persist as browsing around put in store
      //Notes 2: things that are kinda tailerored (liek list of matches/buddies) or that you only gonna call
      //once:, you should make a regular rest call from compendnt did mount and store the return data in state

      //1. LOAD PROFILE USING PROPS
        this.getProfile(this.props.profiles, this.props.match.params.id);

      //TODO
        this.getChatList(this.props.match.params.id);
      //2. POPULATE CHATS, SEE 2 ABOVE, ROUTE SHOULD BE CHATS/ID_OF_SENDER
      //to get chats: make a rest call from a function defined below - note: the func
      //should not be defined in mapDispatchToProps because it will not be using dispath &
      //instead of putting the return data in the store it will be putting it in this
      //components state


      // this.props.get_profiles(this.props.profiles);
      //this get all was for the search filter we have yet to implement
      //move this feature actually to a different page

    }

    onHeightChange(height_id){
      let profile_copy = this.state.profile
      profile_copy.height = height_id
      this.setState({profile: profile_copy})
    }

    onNetworthChange(networth_id){
      let profile_copy = this.state.profile
      profile_copy.networth = networth_id
      this.setState({profile: profile_copy})
    }

    onDeleteProfile(profile_id){
       this.props.deleteProfile(profile_id);
       this.setState({redirect : '/profiles'})
    }

    getProfile(profiles, profile_id){
        if (profile_id in profiles) {
           this.setState({profile: profiles[profile_id]});
           return;
        }

        let request_data = {
            name: 'cyp',
            password: 'password1'
        };

        ajaxGet(
                "/profiles/" + profile_id,

                (response_data) => {
                  this.setState({profile: response_data});
                },

                (xhr, textStatus, errorThrown) => {
                    console.log("ERROR!!!!");
                }
        );
    }
    getChatList(profile_id){
        ajaxGet(
                "/chats/" + profile_id,

                (response_data) => {
                  this.setState({chat_list: response_data})
                },

                (xhr, textStatus, errorThrown) => {
                  console.log("ERROR!!!!!!!!!");
                }
        );

        //2. POPULATE CHATS, SEE 2 ABOVE, ROUTE SHOULD BE CHATS/ID_OF_SENDER
        //to get chats: make a rest call from a function defined below - note: the func
        //should not be defined in mapDispatchToProps because it will not be using dispath &
        //instead of putting the return data in the store it will be putting it in this
        //components state
    }


    render(){
      //put breaK point in render
      let self = this;
      if (this.state.profile === null)
        return <div/>;
      if (this.state.redirect !== null)
        return <Redirect to={this.state.redirect} />;


      let height_id = this.state.profile.height;
      let networth_id = this.state.profile.networth;

      if (height_id === null)
        height_id = 'medium_5'

      if (networth_id === null)
        networth_id = 'one_percent'

      let height_dropdown = dropdown(height_dict, height_id, this.onHeightChange.bind(this));
      let networth_dropdown = dropdown(networth_dict, networth_id, this.onNetworthChange.bind(this));


      let chats = Object(this.state.chat_list)
      let one = Object(this.state.chat_list)[1]

      console.log("*****")
      console.log(one)
      // console.log(chats)
      let chats_list = []
      for (let chat in chats){
         chats_list.push(
           <div>
              <Link to={'/chathistory/' + this.state.profile.id + '/' + chats[chat].recipient_id}>{chats[chat].recipient_fullname}</Link>
           </div>

         )
      }

      return(
        <div className="col_container">

          <div>
            <Link to={'/users'}>Users page</Link>
          </div>

          <div><p>{this.state.profile.id}</p></div>

          <div>
          <label htmlFor="height">Height: </label>
          {height_dropdown}
          </div>

          <div>
          <label htmlFor="networth">networth: </label>
          {networth_dropdown}
          </div>

          <button onClick={() => {self.props.updateProfile(this.state.profile, this.state.profile.id)}}>Submit</button>
          <button onClick={() => { self.onDeleteProfile(this.state.profile.id)}}>Delete Profile</button>

          <div>
            <p>My Matches/Chats</p>
            {chats_list}
          </div>


        </div>
      );
    }
}

const mapStateToProps = state => {
   return { profiles: state.profiles , profile_chats: state.profile_chats};


}

const mapDispatchToProps = dispatch => {
  return {

    //Note 3: you only need to define functions in the mapDispatchToProps is the function will
    //be using dispatch (and a function only needs to use dispath if it is making an update
    //to an object in the store
    //Note 4: using props (which are loaded from the store), you can check for your object; if
    //your object doesnt exist in the props, you can make an rest call to get it (so basically,
   //if its not in props, get it from a rest call;
  // if you need to make an update to an object youre' on, use dispatch )


    updateProfile: (profile, profile_id) => {updateProfile(dispatch, profile, profile_id)},

    deleteProfile: (profile_id) => {deleteProfile(dispatch, profile_id)},

    //camelcase this throughout AND move this to a different page
    get_profiles: (profiles) => {fetchProfiles(dispatch, profiles)}

  };
}

function deleteProfile(dispatch, profile_id){
    dispatch({type: 'DELETE_PROFILE'  , id: profile_id});

    //SHOULDNT THIS HAVE AN AJAX CALL AS WELL TO DELETE FROM DB?
}

function updateProfile(dispatch, profile, profile_id){
    let request_data = {
        height: profile.height,
        networth: profile.networth
    }
    ajaxPut(
           //these are the 4 arguments to ajaxPut; try moving success and error anonynous funcs outside and naming them
           "/profile/" + profile_id,
            request_data,
            //rest call returns updated/new user
            //this anonymous function takes that data, and calls
            //dispatch function to put in redux store
            function(response_data) {
                dispatch({type: 'UPDATE_PROFILE', id: response_data['id'], profile_data: response_data});
            },
            //this.setState({profule_data: response_data})
            function(xhr, textStatus, errorThrown) {
                console.log("ERROR!!!!");
            }
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
