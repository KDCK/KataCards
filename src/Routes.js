import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import SingleCard from './Components/Cards/SingleCard';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/card" component={SingleCard} />
      </Switch>
    )
  }
}

export default Routes
