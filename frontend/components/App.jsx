import React from 'react'
import { render as ReactDomRender } from 'react-dom'

import { Provider, connect } from 'react-redux'
import Store from '../Store'
import Actions from '../Actions'

import LoginForm from './LoginForm'
import ConversationList from './ConversationList'
import NewConversation from './NewConversation'

class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser()
  }

  render() {
    return (
      <div id="app">
        <LoginForm />
        <div>Hello {this.props.currentUser.username}</div>
        {this.props.loggedIn ? <NewConversation /> : null}
        {this.props.loggedIn ? <ConversationList /> : null}
      </div>
    )
  }
}

const mapState = state => ({
  currentUser: state.currentUser,
  loggedIn: state.loggedIn
})

const mapDispatch = dispatch => ({
  fetchUser: () => {
    dispatch(Actions.fetchUser())
  }
})

App = connect(
  mapState,
  mapDispatch
)(App)

document.addEventListener("DOMContentLoaded", function () {
  ReactDomRender(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById("content"));
});

// pusherChannel provided from rails `app/views/layouts/application.html.erb`
pusherChannel.bind('update', function(data) {
  var currentUser = Store.getState().currentUser
  // interested users array calculated by controller and sent in pusher message
  if (data.interested_users.includes(currentUser.id)) {
    if (data.message === 'new_conversation') {
      Store.dispatch(Actions.fetchConversation(data.conversation_id))
    }
    if (data.message === 'new_message') {
      console.log('pusher new_message')
      Store.dispatch(Actions.fetchMessage(data.message_id, data.conversation_id))
    }
  }
})
