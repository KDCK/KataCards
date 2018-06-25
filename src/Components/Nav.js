import React, {Component} from 'react'
import {Navbar, NavItem} from 'react-materialize'
import {Link} from 'react-router-dom'

const Nav = props => {
  return (
    <Navbar>
      <NavItem>
        <Link to="/">Home</Link>
      </NavItem>
      <NavItem>SUP</NavItem>
    </Navbar>
  )
}

export default Nav
