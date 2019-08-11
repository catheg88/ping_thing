import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

class ConversationListItem extends React.Component {

  handleConversationClick(conversation_id) {
    this.props.fetchMessages(conversation_id)
  }

  render() {
    return (
      <li onClick={ () => this.handleConversationClick(this.props.conversation.id) }>
        {this.props.conversation.subject}
      </li>
    )
  }

}

const mapDispatch = dispatch => ({
  fetchMessages: (conversation_id) => {
    dispatch(Actions.fetchMessages(conversation_id))
  }
})

ConversationListItem = connect(
  null,
  mapDispatch
)(ConversationListItem)

export default ConversationListItem
