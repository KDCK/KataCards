import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import { Home, Profile, Nav } from './Components'

class Routes extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/profile" component={Profile}/>
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}

export default Routes
