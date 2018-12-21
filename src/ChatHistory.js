import React from "react";
import {connect} from 'react-redux';
import {ajaxGet} from './common.js';

class ChatHistory extends React.Component{
    constructor(props){
      super(props);

      this.state= {
        chat_history: {}
      }
    }

    componentDidMount(){
       console.log(this.props.match.params)
       getChatHistory(this, this.props.match.params.id, this.props.match.params.recipient_id);
    }


    render(){

      console.log("^^^^")
      console.log(this.state.chat_history)

      let messages_list = []
      let messages = this.state.chat_history

      for(let msg in messages){
          messages_list.push(
            <div>
              <p>{messages[msg].recipient_fullname} - {messages[msg].text}</p>
            </div>
          )
      }

      return(
        <div>
          <div>
            <p>Chat History</p>
          </div>

          <div>
            {messages_list}
          </div>

        </div>
      );
    }
}

const mapStateToProps = state => {
   return { profiles: state.profiles , profile_chats: state.profile_chats};


}

function getChatHistory(self, profile_id, recipient_id){
    ajaxGet(
            "/chathistory/" + profile_id + "/" + recipient_id,

            function(response_data){
              self.setState({chat_history: response_data})
            },

            function(xhr, textStatus, errorThrown){
              console.log("ERRRRRR!!!!")
            }
    );
}

export default connect()(ChatHistory);
