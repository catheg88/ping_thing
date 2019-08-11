import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

import Conversation from './Conversation'

class ConversationsList extends React.Component {
  componentDidMount() {
    this.props.fetchConversations()
  }

  render() {
    const Conversations = this.props.conversations.map( (conversation, idx) => {
      return <Conversation conversation={conversation} key={idx} />
    })

    return (
      <div>
        <h1>Your messages</h1>
        <ul>
          {Conversations}
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
