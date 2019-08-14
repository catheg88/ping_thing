import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions'
import SignupForm from './SignupForm'

class LoginBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      tried: false,
      signup: false
    }
  }

  handleUsernameChange(e) {
    e.preventDefault()
    this.setState({ username: e.target.value})
  }

  handlePasswordChange(e) {
    e.preventDefault()
    this.setState({ password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const loginData = {
      'username': this.state.username,
      'password': this.state.password
    }
    this.props.submitLogin(loginData)
    this.setState({
      username: "",
      password: "",
      tried: true
    })
  }

  handleSignupClick(e) {
    e.preventDefault()
    console.log('signupClick')
    this.setState({ signup: true})
  }

  render() {
    var errors = null
    if (this.props.currentUser.username === 'unauthorized' &&
        this.state.tried === true &&
        this.props.awaitUser === false) {
      errors = <div id="login-error">user {this.props.currentUser.username}...</div>
    }

    var displayName = this.props.currentUser.username
    const navbarRight = this.props.loggedIn ?
        <div id="navbar-right">Hello, {this.props.currentUser.username}</div>
      :
        <div id="navbar-right">
          <div id="login-form">
            <div>
              <span>Username: </span>
              <span>
                <input type="text"
                       value={this.state.username}
                       onChange={this.handleUsernameChange.bind(this)} />
              </span>
            </div>
            <div>
              <span>Password: </span>
              <input type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)} />
            </div>
          </div>
        </div>

    var signupLink = this.props.loggedIn ?
        null
      :
        <div id="signup">
          {this.state.signup ?
              <SignupForm />
            :
              <div id="signup-button-toggle"
                   onClick={this.handleSignupClick.bind(this)}>
                Sign up
              </div>
          }
        </div>

    return (
      <div>
        <div id="navbar">
          <div id="logo">PingThing</div>
          <div id="navbar-right-container">
            {navbarRight}
            <div>{errors}</div>
            {this.props.loggedIn ?
                <div id="login-logout" onClick={this.props.logOut}>
                  Logout
                </div>
              :
                <div id="login-logout" onClick={this.handleSubmit.bind(this)}>
                  Login
                </div>}
          </div>
        </div>
        {signupLink}
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
  submitLogin: loginData => {
    dispatch(Actions.logIn(loginData))
  },
  logOut: () => {
    dispatch(Actions.logOut())
  }
})

LoginBar = connect(
  mapState,
  mapDispatch
)(LoginBar)

export default LoginBar
