import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

class Conversation extends React.Component {
  handleConversationClick(conversation_id) {
    if (!this.props.conversation.messages) {
      this.props.fetchMessages(conversation_id)
    }
    this.props.setFocus(conversation_id)
  }

  render() {
    var participants = this.props.conversation.participants
    if (participants.length === 1) {
      participants = "only you..."
    } else {
    participants = participants.filter( p => (p !== this.props.currentUser.username))
                               .join(", ")
                               + " and you"
    }

    var conversation = (this.props.focus === this.props.conversation.id) ?
      <div className="ActiveConversation"
           onClick={() => this.handleConversationClick(this.props.conversation.id)}
      >
        <div><b>{participants}</b></div>
        <div>{this.props.conversation.subject}</div>
        <div className="ConversationDate">{this.props.conversation.updated_at}</div>
      </div>
      :
      <div className="Conversation"
        onClick={() => this.handleConversationClick(this.props.conversation.id)}
        >
        <div><b>{participants}</b></div>
        <div>{this.props.conversation.subject}</div>
        <div className="ConversationDate">{this.props.conversation.updated_at}</div>
      </div>


    return <div>{conversation}</div>
  }
}

const mapState = state => ({
  currentUser: state.currentUser,
  focus: state.focus
})

const mapDispatch = dispatch => ({
  fetchMessages: conversation_id => {
    dispatch(Actions.fetchMessages(conversation_id))
  },
  setFocus: conversation_id => {
    dispatch(Actions.setFocus(conversation_id))
  }
})

Conversation = connect(
  mapState,
  mapDispatch
)(Conversation)

export default Conversation
