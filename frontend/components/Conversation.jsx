import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

import Message from './Message'

class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  handleConversationClick(conversation_id) {
    if (!this.props.conversation.messages) {
      this.props.fetchMessages(conversation_id)
    }
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    var messageComponents = null
    const messages = this.props.conversation.messages
    if (messages && this.state.expanded) {
      messageComponents = messages.map( (message, idx) => {
        return <Message message={message} key={idx} />
      })
    } else {
      messageComponents = null
    }

    return (
      <div>
        <li onClick={ () => this.handleConversationClick(this.props.conversation.id) }>
          <div><b>Subject: </b>{this.props.conversation.subject}</div>
          <div><b>Participants: </b>{this.props.conversation.participants.join(", ")}</div>
        </li>
        <ul>
          {messageComponents}
        </ul>
      </div>
    )
  }

}

const mapDispatch = dispatch => ({
  fetchMessages: (conversation_id) => {
    dispatch(Actions.fetchMessages(conversation_id))
  }
})

Conversation = connect(
  null,
  mapDispatch
)(Conversation)

export default Conversation
