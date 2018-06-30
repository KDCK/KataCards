import React from 'react'
import { Row, Col } from 'react-materialize'

import PlayedCard from './PlayedCard'

const Board = (props) => {
  
  const { board } = props
  
  if (board === undefined || board === null) {
    return null
  }
  return (
    <Row>
      {Object.values(board).map(card => (
        <Col key={card.id} l={1} style={{ marginBottom: '-15px', width: '200px' }}>
          <PlayedCard card={card} playedCard={props.playedCard} />
        </Col>
      ))}
    </Row>
  )
}

export default Board