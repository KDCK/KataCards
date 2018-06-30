import React from 'react'
import {Row, Col, CardPanel} from 'react-materialize'
import {firebaseConnect} from 'fire-connect'

const UserCard = props => {
  console.log(props)

  return (
    <Col s={8} m={4}>
      <CardPanel className="blue-grey black-text">
        <div>Account Name: {props.user.email}</div>
        <div>Gold: {props.user.gold}</div>
        <div>Handle: {props.user.handle}</div>
        <div>
          Battles Won: <span className="red-text">BATTLE_WON_COUNT</span>
        </div>
      </CardPanel>
    </Col>
  )
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`/users/${connector.props.user.uid}`).on(
      setEventType('value'),
      snapshot => {
        connector.setState({user: snapshot.val()})
      }
    )
})

export default firebaseConnect(addListener, null)(UserCard)
