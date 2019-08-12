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
      'conversation_id': this.props.conversation_id,
      'message': this.state.message
    }
    this.props.sendReplyMessage(replyMessageData)
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>
              <span>Reply: </span>
              <textarea value={this.state.message}
                        onChange={this.handleMessageChange.bind(this)} />
            </label>
          </div>
          <div>{this.state.errors}</div>
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  sendReplyMessage: replyMessageData => {
    dispatch(Actions.sendReplyMessage(replyMessageData))
  }
})

ReplyMessageForm = connect(
  null,
  mapDispatch
)(ReplyMessageForm)

export default ReplyMessageForm
