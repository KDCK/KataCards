import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'

import UserCard from './UserCard'
import Spinner from '../Loader/Spinner.js'
import SingleCard from '../Cards/SingleCard.js'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      cards: [{
        "id": 1,
        "name": "Vérane",
        "atk": 28,
        "def": 10,
        "tier": 2,
        "global_count": 10,
        "description":
          "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc."
      }]
    }
  }

  render() {
    console.log(this.props);

    const cards = this.state.cards
    return (
      <div className="profile">
        <UserCard {...this.props}/>
        {!cards ? <Spinner /> :
          cards.map(card => <SingleCard key={card.id} card={card} />)
        }
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () => ref(`/users/${connector.props.user.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({ user: snapshot.val() })
  })
})

export default firebaseConnect(addListener)(Profile)
