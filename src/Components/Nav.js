import React, {Component} from 'react'
import {Navbar, NavItem, Icon} from 'react-materialize'
import './Nav.css'

const Nav = props => {
  return (
    <Navbar brand="Kata Cards" right>
      <NavItem href="/login">Login</NavItem>
      <NavItem href="/home">Home</NavItem>
      {/* <Icon>search</Icon> */}
    </Navbar>
  )
}

export default Nav
