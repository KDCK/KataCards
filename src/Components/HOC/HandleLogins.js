import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { withRouter } from 'react-router-dom'

import Spinner from '../Loader/Spinner'

export default function (ComposedComponent) {
  class HandleLogins extends Component {
    componentDidMount() {
      this.props.checkUser().onAuthStateChanged(user => {
        if (!user) {
          return
        }
      })
    }

    render() {
      if (!this.props.user) {
        return (<Spinner />)
      }
      return (
        <div>
          <ComposedComponent uid={this.props.user.uid} history={this.props.history}/>
        </div>
      )
    }
  }

  const addDispatcher = (connector) => ({
    checkUser() {
      return connector.props.auth
    },
    returnUser(uid) {
      return uid
    }
  })

  return firebaseConnect(null, addDispatcher)(withRouter(HandleLogins))
}
