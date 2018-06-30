import React, {Component} from 'react'
import {firebaseConnect} from 'fire-connect'
import {Button} from 'react-materialize'
import {withRouter, Link} from 'react-router-dom'

class StagingArea extends Component {
  render() {
    console.log(this.props.battle)
    return (
      <div>
        <h1>Welcome to the Staging Arrea</h1>
        <p>Select your deck!</p>
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  // listenUser: () =>
  //   ref(`/users/${connector.props.user.uid}`).on(
  //     setEventType('value'),
  //     snapshot => {
  //       connector.setState({user: snapshot.val()})
  //     }
  //   ),
  listenBattle: () =>
    ref('/battles').on(setEventType('child_added'), snapshot => {
      connector.setState({battle: snapshot.val()})
    })
})

const addDispatcher = (connector, ref) => ({
  queueUser(user) {
    if (!user.in_battle) {
      ref(`/queue/${connector.props.user.uid}`)
        .push()
        .set(user)
      ref(`/users/${connector.props.user.uid}`).update({
        in_battle: 'waiting'
      })
    }
  }
})

export default firebaseConnect(addListener, addDispatcher)(
  withRouter(StagingArea)
)
