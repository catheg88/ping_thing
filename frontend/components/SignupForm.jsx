import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions'

class SignupBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      tried: false,
      errors: []
    }
  }

  handleUsernameChange(e) {
    e.preventDefault()
    this.setState({ username: e.target.value})
  }

  handleEmailChange(e) {
    e.preventDefault()
    this.setState({ email: e.target.value})
  }

  handlePasswordOneChange(e) {
    e.preventDefault()
    this.setState({ passwordOne: e.target.value})
  }

  handlePasswordTwoChange(e) {
    e.preventDefault()
    this.setState({ passwordTwo: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const signupData = {
      'username': this.state.username,
      'email': this.state.email,
      'passwordOne': this.state.passwordOne,
      'passwordTwo': this.state.passwordTwo
    }

    this.props.submitSignup(signupData)
    this.setState({
      username: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      tried: true
    })
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  render() {
    var errors = null
    if (this.props.currentUser.username === 'unauthorized' &&
        this.state.tried === true &&
        this.props.awaitUser === false) {
      errors = <div id="login-error">
                  Signup failed. Ensure passwords match and are at least 6 characters, or try another username
                </div>
    }
    return (
      <div id="signup-form">

        <div>
          <span>Username: </span>
          <span>
            <input type="text"
                   value={this.state.username}
                   onChange={this.handleUsernameChange.bind(this)} />
          </span>
        </div>
        <div>
          <span>Email: </span>
          <span>
            <input type="text"
                   value={this.state.email}
                   onChange={this.handleEmailChange.bind(this)} />
          </span>
        </div>
        <div>
          <span>Password: </span>
          <input type="password"
            value={this.state.passwordOne}
            onChange={this.handlePasswordOneChange.bind(this)} />
        </div>
        <div>
          <span>Re-type password: </span>
          <input type="password"
            value={this.state.passwordTwo}
            onChange={this.handlePasswordTwoChange.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}/>
        </div>
        {errors}
        <div id="signup-button-toggle" onClick={this.handleSubmit.bind(this)}>
          Sign up
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  currentUser: state.currentUser,
  loggedIn: state.loggedIn,
  awaitUser: state.awaitUser
})

const mapDispatch = dispatch => ({
  submitSignup: signupData => {
    dispatch(Actions.signUp(signupData))
  }
})

SignupBar = connect(
  mapState,
  mapDispatch
)(SignupBar)

export default SignupBar
