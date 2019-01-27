import React from "react";

class Likes extends React.Component{
  constructor(props){
    super(props);
  }

  // componentDidMount(){
  //   this.props.get_profile_likes()
  // }

  render(){
    return(
      <div>
        <p>This my likes</p>
      </div>
    );
  }
}

export default Likes;
