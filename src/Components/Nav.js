import React, { Component } from 'react'
import firebase, { auth } from '../firebase'
import { Navbar, Button, Icon } from 'react-materialize'
import { NavLink, withRouter } from 'react-router-dom'
import './Nav.css'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    auth.signOut()
  }

  render() {
    console.log(this.props);

    if (this.props.authUser) {
      return (
        <Navbar brand="Kata Cards" right>
          <li><NavLink to='/logout' onClick={this.handleClick}>Logout</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/home">Home</NavLink></li>
          {/* <Icon>search</Icon> */}
        </Navbar>
      )
    }
    return (
      <Navbar brand="Kata Cards" right>
        <li><NavLink to="/signup">Signup</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        {/* <Icon>search</Icon> */}
      </Navbar>
    )
  }
}

export default withRouter(Nav)
