import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

class Message extends React.Component {
  render() {
    return (
      <div>
        <div>From: {this.props.message.from}</div>
        <div>At: {this.props.message.created_at}</div>
        <div>Message: {this.props.message.body}</div>
        <div>---</div>
      </div>
    )
  }
}

export default Message
