import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions'

class NewConversationButton extends React.Component {

  handleClick(e) {
    e.preventDefault()
    this.props.setFocus("newConversation")
  }

  render() {
    return <div id="new-conversation-button"
                onClick={this.handleClick.bind(this)}
           >Start a new conversation</div>
  }
}

const mapDispatch = dispatch => ({
  setFocus: conversation_id => {
    dispatch(Actions.setFocus(conversation_id))
  }
})

NewConversationButton = connect(
  null,
  mapDispatch
)(NewConversationButton)

export default NewConversationButton
