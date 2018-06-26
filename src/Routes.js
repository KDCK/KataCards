import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Home, Login, Signup, Logout, Nav, Profile, Trade} from './Components'
import SingleCard from './Components/Cards/SingleCard'
import AllCards from './Components/Cards/AllCards'

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Nav authUser={this.props.authUser} />
        <Switch>
          <Route exact path="/" component={Home} /> {/* maybe we replace w/ a splash screen */}
          <Route exact path="/home"
            render={() => <Home authUser={this.props.authUser}/>}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/trade" component={Trade} />
          <Route exact path="/logout" component={Logout} /> {/* maybe we replace w/ a splash screen */}
        </Switch>
      </div>
    )
  }
}

export default Routes
