import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

import ConversationListItem from './ConversationListItem'

class ConversationsList extends React.Component {
  componentDidMount() {
    this.props.fetchConversations()
  }

  render() {
    const conversationListItems = this.props.conversations.map( (conversation, idx) => {
      return <ConversationListItem conversation={conversation} key={idx} />
    })

    return (
      <div>
        <h1>Your messages</h1>
        <ul>
          {conversationListItems}
        </ul>
      </div>
    )
  }
}

const mapState = state => ({
  conversations: state.conversations
})

const mapDispatch = dispatch => ({
  fetchConversations: () => {
    dispatch(Actions.fetchConversations())
  }
})

ConversationsList = connect(
  mapState,
  mapDispatch
)(ConversationsList)

export default ConversationsList
