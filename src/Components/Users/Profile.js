import React, { Component } from 'react'
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
        <UserCard />
        {/*<h1>Your Card Collection</h1>
        <div className="card-tray">*/}
        <h1 style={{marginBottom: '40px'}}>Your Card Collection</h1>
        <Row>
          {!cards ? (
            <Spinner />
          ) : (
              cards.map(card => (
                <SingleCard card={card} />
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
