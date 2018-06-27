import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'

import firebase from '../../firebase'
import SingleCard from './SingleCard'

class AllCards extends Component {
  constructor() {
    super()
    this.state = {
      cards: [],
    }
  }

  componentDidMount() {
    this.cardsRef = firebase.database().ref('/cards')
    this.cardsRef.on('value', (snapshot) => {
      const allCards = snapshot.val()
      this.setState({ cards: allCards })
    })
    console.log("mounted all cards")
  }

  componentWillUnmount() {
    this.cardsRef.off()
  }


  render() {
    return (
      <Row>
        {this.state.cards[0] && this.state.cards.map(card => (
          <Col key={card.id} s={2} m={2} style={{ paddingBottom: '15px' }}>
            <SingleCard card={card} />
          </Col>
          ))}
      </Row>
    )
  }
}

export default AllCards
