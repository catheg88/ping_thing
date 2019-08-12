import React from 'react'
import { render as ReactDomRender } from 'react-dom'

import { Provider } from 'react-redux'
import Store from '../Store'
import Actions from '../Actions'

import ConversationList from './ConversationList'
import NewConversation from './NewConversation'

class App extends React.Component {

  render(){
    return (
      <div id="app">
        <ConversationList />
        <NewConversation />
      </div>
    )
  }
}

channel.bind('update', function(data) {
  console.log('app receiving pusher update')
  console.log(data)
  // Store.dispatch(Actions.fetchConversations())
})

document.addEventListener("DOMContentLoaded", function () {
  ReactDomRender(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById("content"));
});
