import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions'

class ReplyMessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: "",
      errors: ""
    }
  }

  handleMessageChange(e) {
    e.preventDefault()
    this.setState({ message: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.message === "") {
      this.setState({ errors: "Message cannot be blank"})
      return
    }
    const replyMessageData = {
      'conversation_id': this.props.focus,
      'message': this.state.message
    }
    this.props.sendReplyMessage(replyMessageData)
    this.setState({
      message: "",
      errors: ""
    })
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  render() {
    return (
      <div id="compose-reply">
        <textarea id="reply-text"
                  placeholder="Type message and press enter"
                  value={this.state.message}
                  onChange={this.handleMessageChange.bind(this)}
                  onKeyDown={this.handleKeyDown.bind(this)} />
      </div>
    )
  }
}
// <div>{this.state.errors}</div>

const mapState = state => ({
  focus: state.focus
})

const mapDispatch = dispatch => ({
  sendReplyMessage: replyMessageData => {
    dispatch(Actions.sendReplyMessage(replyMessageData))
  }
})

ReplyMessageForm = connect(
  mapState,
  mapDispatch
)(ReplyMessageForm)

export default ReplyMessageForm
