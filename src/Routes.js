import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
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
import SingleCard from './Components/Cards/SingleCard'
import AllCards from './Components/Cards/AllCards'
import LandingPage from './Components/Landing/LandingPage'

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav authUser={this.props.authUser} />
        <Switch>
          <Route exact path="/splash" component={LandingPage} />
          <Route exact path="/" component={Home} />{' '}
          {/* maybe we replace w/ a splash screen */}
          <Route
            exact
            path="/home"
            render={() => <Home authUser={this.props.authUser} />}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/trade" component={Trade} />
          <Route exact path="/logout" component={Logout} />{' '}
          {/* maybe we replace w/ a splash screen */}
          <Route
            exact
            path="/profile"
            render={() => <Profile authUser={this.props.authUser} />}
          />
          <Route exact path="/logout" component={Logout} />{' '}
          {/* maybe we replace w/ a splash screen */}
          <Route
            exact
            path="/cardstore"
            render={props => <BuyCard {...this.props} />}
          />
          <Route exact path="/gameboard" component={GameBoard} />
        </Switch>
      </div>
    )
  }
}

export default Routes
