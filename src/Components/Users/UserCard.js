import React from 'react'
import {Col, CardPanel} from 'react-materialize'
import {firebaseConnect} from 'fire-connect'
import './UserCard.css'

const UserCard = props => {
  return (
    <Col s={8} m={4}>
      <CardPanel className="black-text">
        <h1>{props.user.codeName}</h1>
        <div className="user-info">Email: {props.user.email}</div>
        <div className="user-info">Gold: {props.user.gold}</div>
        <div className="user-info">Battles Won: {props.user.total_wins}
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
