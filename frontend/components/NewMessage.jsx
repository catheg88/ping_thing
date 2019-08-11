import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions'

class NewMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      to: "",
      subject: "",
      message: ""
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
    const initialMessageData = {
      'to': this.state.to,
      'subject': this.state.subject,
      'message': this.state.message
    }
    this.props.sendInitialMessage(initialMessageData)
  }

  render() {

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>
              <span>To: </span>
              <input type="text"
                     value={this.state.to}
                     onChange={this.handleToChange.bind(this)} />
            </label>
          </div>
          <div>
            <label>
              <span>Subject: </span>
              <input type="text"
                     value={this.state.subject}
                     onChange={this.handleSubjectChange.bind(this)} />
            </label>
          </div>
          <div>
            <label>
              <span>Message: </span>
              <textarea value={this.state.message}
                        onChange={this.handleMessageChange.bind(this)} />
            </label>
          </div>
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

NewMessage = connect(
  null,
  mapDispatch
)(NewMessage)

export default NewMessage
