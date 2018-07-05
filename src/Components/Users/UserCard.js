import React from 'react'
import { Col, CardPanel } from 'react-materialize'
import { firebaseConnect } from 'fire-connect'
import './UserCard.css'

const UserCard = props => {
  let rank = 'Novice'
  if (props.user.total_wins < 5) rank = 'Novice'
  if (props.user.total_wins >= 10) rank = 'Bronze'
  if (props.user.total_wins >= 15) rank = 'Silver'
  if (props.user.total_wins >= 20) rank = 'Gold'
  if (props.user.total_wins >= 30) rank = 'Diamond'

  return (
    <CardPanel className="black-text">
      <h1>{props.user.codeName}</h1>
      <div className="user-info">Email: {props.user.email}</div>
      <div className="user-info">Gold: {props.user.gold}</div>
      <div className="user-info">Battles Won: {props.user.total_wins}
        <div className="user-info">Rank: {rank}</div>
      </div>
    </CardPanel>
  )
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`/users/${connector.props.user.uid}`).on(
      setEventType('value'),
      snapshot => {
        connector.setState({ user: snapshot.val() })
      }
    )
})

export default firebaseConnect(addListener, null)(UserCard)
