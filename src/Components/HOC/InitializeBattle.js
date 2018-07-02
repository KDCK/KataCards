import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'

import Spinner from '../Loader/Spinner'

export default function (ComposedComponent) {
  class InitializeBattle extends Component {
    render() {
      if (!this.props.battleId) {
        return (<Spinner />)
      }
      return (
        <div>
          <ComposedComponent battleId={this.props.battleId} />
        </div>
      )
    }

  }

  const addListener = (connector, ref, user, setEventType) => ({
    listenToCurrentUser: () => ref(`/users/${user.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({ battleId: snapshot.val().in_battle })
    }),
  })

  return firebaseConnect(addListener)(InitializeBattle)
}
