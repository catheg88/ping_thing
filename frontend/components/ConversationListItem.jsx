import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

import Message from './Message'

class ConversationListItem extends React.Component {
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
          {this.props.conversation.subject}
        </li>
        <ul>
          {messageComponents}
        </ul>
      </div>
    )
    // return (
    //   <div>
    //     <li onClick={ () => this.handleConversationClick(this.props.conversation.id) }>
    //       {this.props.conversation.subject}
    //     </li>
    //     { this.props.conversation.messages ?
    //       <div>yes</div> : null
    //     }
    //   </div>
    // )
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
