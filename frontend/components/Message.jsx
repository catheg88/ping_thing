import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

class Message extends React.Component {
  render() {
    return (
      <div className="Message">
        <div className="MessageData">
          <div>{this.props.message.from}</div>
          <div className="MessageDate">{this.props.message.created_at}</div>
        </div>
        <div className="MessageBody">{this.props.message.body}</div>
      </div>
    )
  }
}

export default Message
