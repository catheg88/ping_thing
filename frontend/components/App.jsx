import React from 'react'
import { render as ReactDomRender } from 'react-dom'

import { Provider, connect } from 'react-redux'
import Store from '../Store'
import Actions from '../Actions'

import ConversationList from './ConversationList'
import NewConversation from './NewConversation'

class App extends React.Component {

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return (
      <div id="app">
        <NewConversation />
        <ConversationList />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  getUser: () => {
    dispatch(Actions.getUser())
  }
})

App = connect(
  null,
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
  console.log('Pusher update')
  var currentUser = Store.getState().current_user
  if (data.interested_users.includes(currentUser)) {
    console.log('youre interested')
    console.log(data)
    if (data.message === 'new_conversation') {
      Store.dispatch(Actions.fetchConversation(data.conversation_id))
    }
  }
})
