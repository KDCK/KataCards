import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {firebaseConnect} from 'fire-connect'

import {
  Home,
  Login,
  Signup,
  Update,
  Profile,
  Trade,
  BuyCard,
  GameBoard,
  UserDeck,
  GameOver,
  StagingArea,
} from './Components'

import LandingPage from './Components/Landing/LandingPage'
import AuthorizedUser from './Components/HOC/AuthorizedUser'
import InitializeBattle from './Components/HOC/InitializeBattle';
import HandleLogins from './Components/HOC/HandleLogins';

class Routes extends Component {
  render() {
    return (
      <div>
        {/* <Nav authUser={this.props.authUser} /> */}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/logout" component={LandingPage} />
          <Route exact path="/update" component={HandleLogins(Update)} />
          <Route exact path="/home" component={AuthorizedUser(Home)} />{' '}
          <Route exact path="/trade" component={AuthorizedUser(Trade)} />
          <Route exact path="/profile" component={AuthorizedUser(Profile)} />
          <Route exact path="/userdeck" component={AuthorizedUser(UserDeck)} />
          <Route exact path="/cardstore" component={AuthorizedUser(BuyCard)} />
          <Route exact path="/battle/:battleId" component={AuthorizedUser(InitializeBattle(GameBoard))} />
          <Route exact path="/stagingarea/:battleId" component={AuthorizedUser(StagingArea)} />
        </Switch>
      </div>
    )
  }
}

export default firebaseConnect()(Routes)
