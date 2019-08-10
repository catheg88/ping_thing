import React from 'react'
import { connect } from 'react-redux'
import Actions from '../Actions.js'

class ConversationsList extends React.Component {
  componentDidMount() {
    this.props.getConversations()
  }

  render() {
    return (
      <div>ConversationsList component</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getConversations: () => {
    dispatch(Actions.getConversations())
  }
})

ConversationsList = connect(
  null,
  mapDispatchToProps
)(ConversationsList)

export default ConversationsList
