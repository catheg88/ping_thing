import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

import Conversation from './Conversation'
import NewConversationButton from './NewConversationButton'

class ConversationList extends React.Component {
  componentDidMount() {
    this.props.fetchConversations()
  }

  render() {
    const Conversations = this.props.conversations.map( (conversation, idx) => {
      return <Conversation conversation={conversation}
                           key={idx} />
    })

    return (
      <div id="conversation-list">
        <h2>Conversations</h2>
        <NewConversationButton />
        {Conversations}
      </div>
    )
  }
}

const mapState = state => ({
  conversations: state.conversations,
})

const mapDispatch = dispatch => ({
  fetchConversations: () => {
    dispatch(Actions.fetchConversations())
  }
})

ConversationList = connect(
  mapState,
  mapDispatch
)(ConversationList)

export default ConversationList
