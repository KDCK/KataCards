import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import {Home, Login, Signup, Logout, Nav} from './Components'

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav authUser={this.props.authUser} />
        <Switch>
          <Route exact path="/" component={Home} /> {/* maybe we replace w/ a splash screen */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={Logout} /> {/* maybe we replace w/ a splash screen */}
        </Switch>
      </div>
    )
  }
}

export default Routes
