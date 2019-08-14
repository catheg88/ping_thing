import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions'

class NewConversation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      to: "",
      subject: "",
      message: "",
      errors: ""
    }
  }

  handleToChange(e) {
    e.preventDefault()
    this.setState({ to: e.target.value})
  }

  handleSubjectChange(e) {
    e.preventDefault()
    this.setState({ subject: e.target.value})
  }

  handleMessageChange(e) {
    e.preventDefault()
    this.setState({ message: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    if ( this.state.to === "" || this.state.subject === "" || this.state.message === "") {
      this.setState({ errors: "To, Subject, and Message fields cannot be blank"})
      return
    }
    const initialMessageData = {
      'to': this.state.to,
      'subject': this.state.subject,
      'message': this.state.message
    }
    this.props.sendInitialMessage(initialMessageData)
    // this.setState({
    //   to: "",
    //   subject: "",
    //   message: "",
    //   errors: ""
    // })
    // refresh
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  render() {
    return (
      <div id="new-conversation">
        <h2>New Conversation</h2>



        <form onSubmit={this.handleSubmit.bind(this)}>









            <input type="text"
                   placeholder="To"
                   value={this.state.to}
                   onChange={this.handleToChange.bind(this)} />
            <input type="text"
                   placeholder="Subject"
                   value={this.state.subject}
                   onChange={this.handleSubjectChange.bind(this)} />
            <textarea className="MessageText"
                      placeholder="Type your message and press Enter to send"
                      value={this.state.message}
                      onChange={this.handleMessageChange.bind(this)}
                      onKeyDown={this.handleKeyDown.bind(this)} />


          <div>{this.state.errors}</div>
          <input type="submit" value="Send" />








        </form>



      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  sendInitialMessage: initialMessageData => {
    dispatch(Actions.sendInitialMessage(initialMessageData))
  }
})

NewConversation = connect(
  null,
  mapDispatch
)(NewConversation)

export default NewConversation
