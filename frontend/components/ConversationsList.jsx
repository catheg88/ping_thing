import React from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions.js'

class ConversationsList extends React.Component {
  componentDidMount() {
    this.props.fetchConversations()
  }

  render() {
    return (
      <div>ConversationsList component</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchConversations: () => {
    dispatch(Actions.fetchConversations())
  }
})

ConversationsList = connect(
  null,
  mapDispatchToProps
)(ConversationsList)

export default ConversationsList
