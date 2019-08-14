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
  }

  render() {
    return (
      <div id="app">
        <LoginBar />
        <div id="main-pane">
          <div id="column-flex-container">
            {this.props.loggedIn ?
              <div id="list-pane">
                <ConversationList />
              </div>
              : null}
            {this.props.loggedIn ?
              <div id="read-write-pane">
                {(this.props.focus === 'newConversation') ?
                  <NewConversation />
                  :
                  <MessageList />
                }
              </div>
              : null}
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
  console.log('pusher data')
  console.log(data)
  if (data.interested_users.includes(currentUser.id)) {
    if (data.message === 'new_conversation') {
      Store.dispatch(Actions.fetchConversation(data.conversation_id))
      if (data.user_id === currentUser.id) {
        Store.dispatch(Actions.fetchMessages(data.conversation_id))
        Store.dispatch(Actions.setFocus(data.conversation_id))
      }
    }
    if (data.message === 'new_message') {
      console.log('pusher new_message')
      Store.dispatch(Actions.fetchMessage(data.message_id, data.conversation_id))
    }
  }
})
