import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import {Home} from './Components'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} />
        {/* <Route path="/card" component="TODO" /> */}
      </Switch>
    )
  }
}

export default Routes
