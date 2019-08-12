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

// pusherChannel provided from rails `app/views/layouts/application.html.erb`
pusherChannel.bind('update', function(data) {
  console.log('app receiving pusher update')
  console.log(data)
  // Store.dispatch(Actions.fetchConversations())
})

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
