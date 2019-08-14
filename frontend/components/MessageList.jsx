import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

import Message from './Message'
import ReplyMessageForm from './ReplyMessageForm'

class MessageList extends React.Component {

  render() {
    var messageComponents = null
    console.log('rendering MessageList')
    this.props.conversations.forEach( conversation => {
      if (conversation.id === this.props.focus) {
        console.log('bingo!')
        if (conversation.messages) {
          messageComponents = conversation.messages.map( (message, idx) => {
            return <Message message={message}
                            conversation_id={conversation.id}
                            key={idx} />
          })
        }
      }
    })
    return(
      <div>
        <ReplyMessageForm conversation_id={this.focus} />
        {messageComponents}
      </div>
    )
  }
}

const mapState = state => ({
  focus: state.focus,
  conversations: state.conversations
})

const mapDispatch = dispatch => ({
  fetchConversations: () => {
    dispatch(Actions.fetchConversations())
  }
})

MessageList = connect(
  mapState,
  mapDispatch
)(MessageList)

export default MessageList
