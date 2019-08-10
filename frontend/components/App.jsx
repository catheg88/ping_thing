import React from 'react'
import { render as ReactDomRender } from 'react-dom'
import { Provider, connect } from 'react-redux'

import Store from '../Store'

class App extends React.Component {
  render(){
    return <div id="app">react threw this App component in here</div>
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDomRender(
    <Provider store={Store}>
      <App />
    </Provider>,
    document.getElementById("content"));
});
