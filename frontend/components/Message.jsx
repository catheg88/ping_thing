import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions.js'

class Message extends React.Component {
  render() {
    // console.log(this.props.message)
    return (
      <div>
        <div>{this.props.message.created}</div>
        <div>{this.props.message.body}</div>
        <div>{this.props.message.read}</div>
      </div>
    )
  }
}

export default Message
