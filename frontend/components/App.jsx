import React from 'react'
import { render as ReactDomRender } from 'react-dom'

class App extends React.Component {
  render(){
    return <div>react threw this App component in here</div>
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDomRender(<App />, document.getElementById("content"));
});
