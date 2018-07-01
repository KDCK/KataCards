import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { Row, Col } from 'react-materialize'
import { withRouter } from 'react-router-dom'

import SingleCard from '../Cards/SingleCard.js'
import Spinner from '../Loader/Spinner.js'

import './StagingArea.css'

class StagingArea extends Component {
  constructor(props) {
    super(props)
    this.selectCard = this.selectCard.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.player && !prevProps.player) {
      const { player, user } = this.props
      console.log('asdfjha')

      this.props.initializeBattle(player.in_battle, player, user.uid)
    }
  }

  selectCard(card) {
    // console.log(card)
    const { player, user } = this.props
    this.props.updateDeck(player.in_battle, card, user.uid)
  }

  render() {
    return (
      <div className="staging-area-main">
        <h1>Welcome to the Staging Area</h1>
        <h3>Select your deck!</h3>
        <Row>
          {!this.props.player ? (
            <Spinner />
          ) : (
            this.props.player.cards.map(card => (
              <Col
                // onClick={this.selectCard}
                // value={card}
                key={card.id}
                s={2}
                m={2}
                style={{ paddingBottom: '15px' }}
              >
                <SingleCard selectCard={this.selectCard} card={card} />
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
    ref(`/users/${connector.props.auth.currentUser.uid}`).on(
      setEventType('value'),
      snapshot => {
        connector.setState({ player: snapshot.val() })
      }
    ),
  listenBattle: () =>
    ref('/battles').on(setEventType('child_added'), snapshot => {
      connector.setState({ battle: snapshot.val() })
    })
})

const addDispatcher = (connector, ref) => ({
  initializeBattle(battleId, user, uid) {
    ref(`/battles/${battleId}`).once('value', snapshot => {
      const battle = snapshot.val()
      if (battle.p1 === uid) {
        const p1 = {}
        p1[uid] = user
        ref(`/battles/${battleId}`).update({
          p1: p1,
          p1done: false,
          p2done: false,
          p1atk: 0,
          p2atk: 0,
          p1def: 0,
          p2def: 0,
          ready: false,
          turn: 'playerOne',
          battleId: battleId
        })
      } else if (battle.p2 === uid) {
        const p2 = {}
        p2[uid] = user
        ref(`/battles/${battleId}`).update({
          p2: p2,
          p1done: false,
          p2done: false,
          p1atk: 0,
          p2atk: 0,
          p1def: 0,
          p2def: 0,
          ready: false,
          turn: 'playerOne',
          battleId: battleId
        })
      }
    })
  },
  updateDeck(battleId, card, uid) {
    const parentKey = ref(`battles/${battleId}/p1/${uid}/deck`).push(card).key
    ref(`battles/${battleId}/p1/${uid}/deck/${parentKey}`).update({
      id: parentKey
    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(
  withRouter(StagingArea)
)
