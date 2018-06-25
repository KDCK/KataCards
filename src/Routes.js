import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import { Home, User } from './Components'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/user" component={User}/>
        <Route path="/" component={Home} />
        {/* <Route path="/card" component="TODO" /> */}
      </Switch>
    )
  }
}

export default Routes
