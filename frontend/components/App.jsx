import React from 'react'
import { render as ReactDomRender } from 'react-dom'

import { Provider, connect } from 'react-redux'
import Store from '../Store'
import Actions from '../Actions'

import ConversationList from './ConversationList'
import NewConversation from './NewConversation'

class App extends React.Component {

  render() {
    return (
      <div id="app">
        <div>Hello, {this.props.current_user.email}</div>
        <NewConversation />
        <ConversationList />
      </div>
    )
  }
}

const mapState = state => ({
  current_user: state.current_user
})

App = connect(
  mapState,
  null
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
  var currentUser = Store.getState().current_user
  // interested users array calculated by controller and sent in pusher message
  if (data.interested_users.includes(currentUser)) {
    if (data.message === 'new_conversation') {
      Store.dispatch(Actions.fetchConversation(data.conversation_id))
    }
    if (data.message === 'new_message') {
      Store.dispatch(Actions.fetchMessage(data.message_id, data.conversation_id))
    }
  }
})
