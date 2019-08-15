import React from 'react'
import { render as ReactDomRender } from 'react-dom'

import { Provider, connect } from 'react-redux'
import Store from '../Store'
import Actions from '../Actions'

import LoginBar from './LoginBar'
import SignupForm from './SignupForm'
import ConversationList from './ConversationList'
import MessageList from './MessageList'
import NewConversation from './NewConversation'

class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser()
    this.props.fetchUsernames()
  }

  render() {
    return (
      <div id="app">
        <LoginBar />
        <div id="main-pane">
          <div id="column-flex-container">
            {this.props.loggedIn ?
                null
              :
                <div id="splash-message">
                  <div>
                    PingThing, the real-time messaging app for all your legal IRC needs
                  </div>
                  <p></p>
                  <div>
                    Sign up or sign in to continue
                  </div>
                </div>}
            {this.props.loggedIn ?
                <div id="list-pane">
                  <ConversationList />
                </div>
              :
                null}
            {this.props.loggedIn ?
                <div id="read-write-pane">
                  {(this.props.focus === 'newConversation') ?
                      <NewConversation />
                    :
                      <MessageList />}
                </div>
              :
                null}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  currentUser: state.currentUser,
  loggedIn: state.loggedIn,
  focus: state.focus
})

const mapDispatch = dispatch => ({
  fetchUser: () => {
    dispatch(Actions.fetchUser())
  },
  fetchUsernames: () => {
    dispatch(Actions.fetchUsernames())
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
    document.getElementById("root"));
});

// pusherChannel provided from rails `app/views/layouts/application.html.erb`
pusherChannel.bind('update', function(data) {
  var currentUser = Store.getState().currentUser
  // interested users array calculated by controller and sent in pusher message
  if (data.interested_users.includes(currentUser.id)) {
    if (data.message === 'new_conversation') {
      Store.dispatch(Actions.fetchConversation(data.conversation_id))
      if (data.user_id === currentUser.id) {
        Store.dispatch(Actions.fetchMessages(data.conversation_id))
        Store.dispatch(Actions.setFocus(data.conversation_id))
      }
    }
    if (data.message === 'new_message') {
      Store.dispatch(Actions.fetchMessage(data.message_id, data.conversation_id))
    }
  }
})
