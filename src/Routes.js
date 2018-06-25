import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from './Components'
import SingleCard from './Components/Cards/SingleCard'
import AllCards from './Components/Cards/AllCards'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/allcard" component={AllCards} />
        <Route exact path="/card" component={SingleCard} />
        <Route path="/" component={Home} />
      </Switch>
    )
  }
}

export default Routes
