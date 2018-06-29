import React from 'react'
import {Col, CardPanel} from 'react-materialize'

const UserCard = (props) => {
  return(
      <Col s={8} m={4}>
        <CardPanel className="blue-grey black-text">
        <h3>{props.codeName}</h3>
        <div >Gold: {props.gold}</div>
        <div>Battles Won: <span className="red-text">BATTLE_WON_COUNT</span></div>
        </CardPanel>
      </Col>
  )
}

export default UserCard
