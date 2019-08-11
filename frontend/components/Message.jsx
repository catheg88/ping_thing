import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

class Message extends React.Component {
  render() {
    // console.log(this.props.message)
    return (
      <div>
        <div>From: {this.props.message.from}</div>
        <div>At: {this.props.message.created}</div>
        <div>Message: {this.props.message.body}</div>
        <div>Read? {this.props.message.read ? "Yes" : "No"}</div>
        <div>---</div>
      </div>
    )
  }
}

export default Message
