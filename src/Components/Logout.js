import React from 'react'
import {auth} from '../firebase'
import {firebaseConnect} from 'fire-connect'

const Logout = props => {
  console.log(props.user);
  !props.user.uid ? null : props.setOffline(props.user.uid)
  return (
    <div>Logged Out</div>
  )
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`users/${user.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({user: snapshot.val()})
    })
})

const addDispatcher = (connector, ref, user) => ({
  setOffline(uid) {
    const offline = false
    ref(`users/${uid}`).update({online:offline})
    auth.signOut()
    this.props.history.push('/home')
  }
})

export default firebaseConnect(addListener, addDispatcher)(Logout)
