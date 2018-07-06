import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { firebaseConnect } from 'fire-connect'
import { Row, Col } from 'react-materialize'

import UserCard from './UserCard'
import Spinner from '../Loader/Spinner.js'
import SingleCard from '../Cards/SingleCard.js'
import './profile.css'

class Profile extends Component {
  render() {
    const { cards } = this.props.user

    return (
      <div className="profile">
        {this.props.user.mute ? null : (
          <ReactPlayer
            style={{ display: 'none' }}
            url="https://www.youtube.com/watch?v=CrkS-Z-TACE"
            playing
            loop
          />
        )}
        <UserCard />
        <h1 style={{ marginBottom: '40px' }}>Your Card Collection</h1>
        <Row>
          {!cards ? (
            <Spinner />
          ) : (
            cards
              .sort((cardA, cardB) => {
                if (cardA.tier < cardB.tier) return 1
                if (cardB.tier > cardA.tier) return -1
                else return 0
              })
              .map(card => (
                <Col
                  key={card.id}
                  s={2}
                  m={2}
                  style={{ paddingBottom: '15px' }}
                >
                  <SingleCard card={card} />
                </Col>
              ))
          )}
        </Row>
      </div>
    )
  }
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

export default firebaseConnect(addListener)(Profile)
