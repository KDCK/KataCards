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
      console.log(this.props.location.pathname);

      if (!this.props.user) {
        return (<Spinner />)
      }
      if (this.props.location.pathname === '/gameboard') {
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