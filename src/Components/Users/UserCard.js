import React from 'react'
import {Row, Col, CardPanel} from 'react-materialize'
import { firebaseConnect } from 'fire-connect'

const UserCard = (props) => {
  console.log(props);
  
  return(
    <Row>
      <Col s={8} m={4}>
        <CardPanel className="blue-grey black-text">
        <Row>
        <span>{props.user.name}</span>
        </Row>
        <div >Gold: {props.user.gold}</div>
        <div>Handle: {props.user.handle}</div>
        <div>Battles Won: <span className="red-text">BATTLE_WON_COUNT</span></div>
        </CardPanel>
      </Col>
    </Row>
  )
}

export default firebaseConnect()(UserCard)
