import React, {Component} from 'react'
import {firebaseConnect} from 'fire-connect'

import Routes from './Routes'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    )
  }
}

export default firebaseConnect()(App)
