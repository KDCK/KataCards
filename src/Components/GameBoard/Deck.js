import React from 'react'
import { Row, Col } from 'react-materialize'

import BattleCard from './BattleCard'

const Deck = (props) => {  
  const { deck } = props  
  if(deck === undefined) {
    return null
  }
  return (
    <Row>
      {Object.values(deck).map(card => (
        <Col key={card.id} l={1} style={{ marginBottom: '-15px', marginTop: '5px', width: '180px', transform: 'scale(0.9)' }}>
          <BattleCard card={card} playedCard={props.playedCard} turn={props.turn}/>
        </Col>
      ))}
    </Row>
  )
}

export default Deck