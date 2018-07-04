import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'

import Spinner from '../Loader/Spinner'
import Nav from '../Nav';


export default function (ComposedComponent) {
  class AuthorizedUser extends Component {
    componentDidMount() {
      this.props.checkUser().onAuthStateChanged(user => {
        if (!user) {
          this.props.history.push('/')
        }
      })
    }

    render() {
      
      if (!this.props.user) {
        return (<Spinner />)
      }
      if (this.props.match.path === '/battle/:battleId' 
      || this.props.location.pathname === '/'
      || this.props.match.path === '/stagingarea/:battleId') {
        return (<ComposedComponent />)
      } else {
        return (
          <div>
            <Nav />
            <ComposedComponent />
          </div>
        )
      }
    }
  }

  const addDispatcher = (connector) => ({
    checkUser() {
      return connector.props.auth
    }
  })

  return firebaseConnect(null, addDispatcher)(AuthorizedUser)
}