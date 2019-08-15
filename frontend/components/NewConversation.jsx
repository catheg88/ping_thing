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
      errors: "",
      matchingUsernames: [],
      recipients: [],
      showUsers: false
    }
  }

  handleToChange(e) {
    e.preventDefault()
    this.setState({
      to: e.target.value
    }, () => this.matchUsernames())
  }

  matchUsernames() {
    var matchingUsernames = []
    if (this.state.to !== "" && this.state.to.length > 1) {
      matchingUsernames = this.props.usernames.filter( username => username.includes(this.state.to))
    }
    this.setState({matchingUsernames: matchingUsernames})
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
    if ( this.state.recipients.length === 0 || this.state.subject === "" || this.state.message === "") {
      this.setState({ errors: "To, Subject, and Message fields cannot be blank"})
      return
    }
    const initialMessageData = {
      'to': this.state.to,
      'subject': this.state.subject,
      'message': this.state.message
    }
    this.props.sendInitialMessage(initialMessageData)
    this.setState({
      to: "",
      subject: "",
      message: "",
      errors: "",
      matchingUsernames: []
    })
  }

  handleSubmitKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  handleToKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
    }
    if ((e.key === 'Enter' || e.key === 'Tab') && this.state.matchingUsernames.length === 1) {
      if (!this.state.recipients.includes(this.state.matchingUsernames[0]) ) {
        this.state.recipients.push(this.state.matchingUsernames[0])
      }
      this.setState({
        to: ""
      }, () => this.matchUsernames())
    }
  }

  handleShowUsersClick(e) {
    const newShowUsersState = !this.state.showUsers
    this.setState({showUsers: newShowUsersState})
  }

  render() {
    var usernames = null
    if (this.props.usernames && this.state.showUsers) {
      usernames = this.props.usernames.map( (username, idx) => {
        return <div key={idx}>{username}</div>
      })
    } else {
      usernames = null
    }

    const usernameColor = this.state.matchingUsernames.length === 1 ? 'green' : 'red'
    return (
      <div id="new-conversation">
        <h2 id="new-conversation-heading">New Conversation</h2>
        <div id="new-conversation-bg">

          <input id="to-input" type="text"
                 placeholder="Type usernames to add recipients"
                 value={this.state.to}
                 onChange={this.handleToChange.bind(this)}
                 onKeyDown={this.handleToKeyDown.bind(this)} />
               <div id="username-matches">
                 <span>Matching usernames: <span style={{color: usernameColor}}>
                   {this.state.matchingUsernames.join(", ")}
                  </span>
                </span>
                 {this.state.matchingUsernames.length === 1 ?
                     <span style={{color: 'green'}}>enter/tab to add recipient</span>
                   :
                     null
                 }</div>
               <div id="recipients">
                 Recipients:<pre> </pre><span style={{color: 'black'}}>{this.state.recipients.join(", ")}</span>
               </div>
          <input id="subject-input" type="text"
            placeholder="Subject"
            value={this.state.subject}
            onChange={this.handleSubjectChange.bind(this)} />
          <textarea id="NewMessageText"
               placeholder="Type your message and press Enter to send"
               value={this.state.message}
               onChange={this.handleMessageChange.bind(this)}
               onKeyDown={this.handleSubmitKeyDown.bind(this)} />
        </div>
        <div style={{color: 'red'}}>{this.state.errors}</div>
        <div>
          <span id="show-username-list"onClick={this.handleShowUsersClick.bind(this)}>
            {this.state.showUsers ? 'Hide' : 'Show'} username list
          </span>
        </div>
        <div><span>{usernames}</span></div>
      </div>
    )
  }
}

const mapState = state => ({
  usernames: state.usernames
})

const mapDispatch = dispatch => ({
  sendInitialMessage: initialMessageData => {
    dispatch(Actions.sendInitialMessage(initialMessageData))
  }
})

NewConversation = connect(
  mapState,
  mapDispatch
)(NewConversation)

export default NewConversation
