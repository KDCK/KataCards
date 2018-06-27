import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import { firebaseConnect } from 'fire-connect'

import {
  Home,
  Login,
  Signup,
  Nav,
  Profile,
  Trade,
  BuyCard,
  GameBoard
} from './Components'
import LandingPage from './Components/Landing/LandingPage';
import AuthorizedUser from './Components/HOC/AuthorizedUser';


class Routes extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Nav authUser={this.props.authUser} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={LandingPage} />
          <Route exact path="/home" component={AuthorizedUser(Home)} /> {/* maybe we replace w/ a splash screen */}
          <Route exact path="/trade" component={AuthorizedUser(Trade)} />
          <Route exact path="/profile" component={AuthorizedUser(Profile)} />
          {/* maybe we replace w/ a splash screen */}
          <Route exact path="/cardstore" render={() => <BuyCard authUser={this.props.authUser} />} />
          <Route exact path="/gameboard" component={GameBoard} />
        </Switch>
      </div>
    )
  }
}

export default firebaseConnect()(Routes)