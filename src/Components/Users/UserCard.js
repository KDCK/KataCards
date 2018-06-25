import React from 'react'
import {Row, Col, CardPanel} from 'react-materialize'

const UserCard = (props) => {
  const user = props.user
  return(
    <Row>
      <Col s={8} m={4}>
        <CardPanel className="blue-grey black-text">
        <Row>
        <span>{user.name}</span>
        </Row>
        <div >Gold: {user.gold}</div>
        <div>Handle: {user.handle}</div>
        <div>Battles Won: <span className="red-text">BATTLE_WON_COUNT</span></div>
        </CardPanel>
      </Col>
    </Row>
  )
}

export default UserCard;
