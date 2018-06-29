import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {firebaseConnect} from 'fire-connect'

import {
  Home,
  Login,
  Signup,
  Update,
  Nav,
  Profile,
  Trade,
  BuyCard,
  GameBoard,
  UserDeck,
} from './Components'
import LandingPage from './Components/Landing/LandingPage'
import AuthorizedUser from './Components/HOC/AuthorizedUser'

class Routes extends Component {
  render() {
    return (
      <div>
        <Nav authUser={this.props.authUser} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/update" component={Update} />
          <Route exact path="/logout" component={LandingPage} />
          <Route exact path="/home" component={AuthorizedUser(Home)} />{' '}
          {/* maybe we replace w/ a splash screen */}
          <Route exact path="/trade" component={AuthorizedUser(Trade)} />
          <Route exact path="/profile" component={AuthorizedUser(Profile)} />
          <Route exact path="/userdeck" component={AuthorizedUser(UserDeck)} />
          {/* maybe we replace w/ a splash screen */}
          <Route
            exact
            path="/profile"
            render={() => <Profile authUser={this.props.authUser} />}
          />
          <Route exact path="/cardstore" component={AuthorizedUser(BuyCard)} />
          <Route exact path="/gameboard" component={GameBoard} />
        </Switch>
      </div>
    )
  }
}

export default firebaseConnect()(Routes)
