import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import { firebaseConnect } from 'fire-connect'

import {
  Home,
  Login,
  Signup,
  Logout,
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
    return (
      <div>
        <Nav authUser={this.props.authUser} />
        <Switch>
          <Route exact path="/splash" component={LandingPage} />
          <Route exact path="/" component={AuthorizedUser(Home)} /> {/* maybe we replace w/ a splash screen */}
          <Route exact path="/home"
            render={() => <Home authUser={this.props.authUser}/>}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/trade" component={Trade} />
          <Route exact path="/logout" component={Logout} /> {/* maybe we replace w/ a splash screen */}
          <Route exact path="/profile" render={() => <Profile authUser={this.props.authUser} />} />
          <Route exact path="/logout" component={Logout} />{' '}
          {/* maybe we replace w/ a splash screen */}
          <Route exact path="/cardstore" render={() => <BuyCard authUser={this.props.authUser} />} />
          <Route exact path="/gameboard" component={GameBoard} />
        </Switch>
      </div>
    )
  }
}

export default firebaseConnect()(Routes)