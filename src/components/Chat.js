import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Backend from '../Backend';

class Chat extends Component {
  state = {
    messages: []
  }

  render() {
    return(
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => {
         //send message to backend 
         Backend.sendMessage(message)
        }}
        user={{
          _id: Backend.getUid(),
          name: this.props.name
        }}
      />
    )
  }

  componentDidMount() {
    Backend.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        }
      })
    })
  }

  componentWillUnmount() {
    Backend.closeChat();
  }
}

Chat.defaultProps = {
  name: 'User'
}

Chat.propTypes = {
  name: React.PropTypes.string
}

export default Chat;