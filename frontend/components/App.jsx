import React from 'react'
import { render as ReactDomRender } from 'react-dom'

import { Provider } from 'react-redux'
import Store from '../Store'

import ConversationList from './ConversationList'
import NewConversation from './NewConversation'

class App extends React.Component {

  render(){
    return (
      <div id="app">
        <h1>PingThing</h1>
        <ConversationList />
        <NewConversation />
      </div>
    )
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDomRender(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById("content"));
});
