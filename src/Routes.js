import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, Profile, Nav } from './Components'
import SingleCard from './Components/Cards/SingleCard'
import AllCards from './Components/Cards/AllCards'

class Routes extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/allcard" component={AllCards} />
          <Route exact path="/card" component={SingleCard} />
          <Route path="/" component={Home} />
        </Switch>
      </div>

    )
  }
}

export default Routes
