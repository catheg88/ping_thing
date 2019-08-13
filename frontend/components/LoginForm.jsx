import React from 'react'
import { connect } from 'react-redux'

import Actions from '../Actions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
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
      password: ""
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>
              <span>Username: </span>
              <input type="text"
                     value={this.state.username}
                     onChange={this.handleUsernameChange.bind(this)} />
            </label>
            <label>
              <span>Password: </span>
              <input type="text"
                     value={this.state.password}
                     onChange={this.handlePasswordChange.bind(this)} />
            </label>
          </div>
          <div>{this.state.errors}</div>
          <input type="submit" value="Login" />
          <button type="button"onClick={this.props.logOut}>Logout</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  submitLogin: loginData => {
    dispatch(Actions.logIn(loginData))
  },
  logOut: () => {
    dispatch(Actions.logOut())
  }
})

LoginForm = connect(
  null,
  mapDispatch
)(LoginForm)

export default LoginForm
