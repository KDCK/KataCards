import React from 'react'
import { Row, Col } from 'react-materialize'

import PlayedCard from './PlayedCard'

const Board = (props) => {
  
  const { board } = props
  
  if (board === undefined || board === null) {
    return <div className="board-placeholder"/>
  }
  return (
    <Row>
      {Object.values(board).map(card => (
        <Col key={card.name} l={1} style={{ marginBottom: '-15px', marginTop: '5px', width: '180px', transform: 'scale(0.9)' }}>
          <PlayedCard card={card} playedCard={props.playedCard} />
        </Col>
      ))}
    </Row>
  )
}

export default Board