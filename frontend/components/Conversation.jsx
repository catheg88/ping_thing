import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

class Conversation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }

  handleConversationClick(conversation_id) {
    if (!this.props.conversation.messages) {
      this.props.fetchMessages(conversation_id)
    }
    this.props.setFocus(conversation_id)
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render() {
    var participants = this.props.conversation.participants
    participants = participants.filter( p => (p !== this.props.currentUser.username))
                               .join(", ")

    return (
      <div onClick={ () => this.handleConversationClick(this.props.conversation.id) }>
        <div><b>{participants}</b></div>
        <div>subject: {this.props.conversation.subject}</div>
        <div>{this.props.conversation.updated_at}</div>
      </div>
    )
  }
}

const mapState = state => ({
  currentUser: state.currentUser
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
