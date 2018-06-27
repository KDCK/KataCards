import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'

import Spinner from '../Loader/Spinner'


export default function (ComposedComponent) {
  class AuthorizedUser extends Component {
    componentDidMount() {
      this.props.checkUser().onAuthStateChanged(user => {
        if(!user) {
          this.props.history.push('/')
        }
      })
    }

    render() {
      if (!this.props.user) {
        return (<Spinner />)
      }
      return (<ComposedComponent />)
    }
  }

  const addDispatcher = (connector) => ({
    checkUser() {
      return connector.props.auth
    }
  })

  return firebaseConnect(null, addDispatcher)(AuthorizedUser)
}