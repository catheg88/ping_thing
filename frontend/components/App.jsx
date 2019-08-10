import React from 'react'
import { render as ReactDomRender } from 'react-dom'

import { Provider } from 'react-redux'
import Store from '../Store'

import ConversationsList from './ConversationsList'

class App extends React.Component {

  render(){
    return (
      <div id="app">
        <ConversationsList />
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
