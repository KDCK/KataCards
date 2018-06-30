import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { firebaseConnect } from 'fire-connect'
import { Row, Col } from 'react-materialize'
import SingleCard from '../Cards/SingleCard.js'
import './UserDeck.css';

const dummyCards =[
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 10,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  }
]

class UserDeck extends Component {
  render() {
    const cards = this.props.user.cards
    return (
        <Row className="user-deck">
          {!cards ? null: dummyCards.map(card => (
            <Col className="user-deck-col" key={card.id} s={2} m={2} style={{ paddingBottom: '15px' }}>
                  <SingleCard card={card} />
            </Col>
            ))}
        </Row>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () => ref(`/users/${connector.props.user.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({ user: snapshot.val() })
  })
})

export default firebaseConnect(addListener)(UserDeck)
