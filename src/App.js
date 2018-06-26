// All Routes Go Here

import React, {Component} from 'react'
import firebase, {auth} from './firebase'
import Routes from './Routes'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  render() {
    return (
      <div>
        <Routes authUser={this.state.authUser} />
      </div>
    )
  }
}

export default App
