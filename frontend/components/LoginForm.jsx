import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      tried: false
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

  render() {
    var errors = null
    if (this.props.currentUser === 'unauthorized' && this.state.tried === true) {
      errors = <div>Login failed</div>
    }
    return (
      <div>
      {this.props.loggedIn ?
        <button type="button"onClick={this.props.logOut}>Logout</button>
        :
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <span>Username: </span>
            <input type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)} />
          </label>
          <label>
            <span>Password: </span>
            <input type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange.bind(this)} />
          </label>
          <input type="submit" value="Login" />
          {errors}
        </form>
      }
      </div>
    )
  }
}

const mapState = state => ({
  currentUser: state.currentUser.id,
  loggedIn: state.loggedIn
})

const mapDispatch = dispatch => ({
  submitLogin: loginData => {
    dispatch(Actions.logIn(loginData))
  },
  logOut: () => {
    dispatch(Actions.logOut())
  }
})

LoginForm = connect(
  mapState,
  mapDispatch
)(LoginForm)

export default LoginForm
