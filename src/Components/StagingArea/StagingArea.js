import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { Row, Col } from 'react-materialize'
import { withRouter } from 'react-router-dom'

import SingleCard from '../Cards/SingleCard.js'
import Spinner from '../Loader/Spinner.js'

import './StagingArea.css'

class StagingArea extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.player && !prevProps.player) {
      const { player, user } = this.props
      this.props.initializeBattle(player.in_battle, player, user.uid)
    }
  }

  render() {
    if (!(this.props.battleInfo && this.props.player && this.props.user)) return <Spinner />
    const { battleInfo, user, battleId } = this.props
    if (typeof battleInfo.p1 !== 'object' || typeof battleInfo.p2 !== 'object') return <Spinner />

    const playerInfo = (battleInfo.p1).hasOwnProperty(user.uid) ? battleInfo.p1[user.uid] : battleInfo.p2[user.uid]
    // console.log(Object.values(playerInfo.deck));

    return (
      <div className="staging-area-main">
        <h1>Welcome to the Staging Area</h1>
        <h3>Select 5 cards for your battle deck!</h3>
        <Row>
          {playerInfo.deck &&
            Object.values(playerInfo.deck).map(card => (
              <Col
                onClick={() => this.props.removeFromDeck(battleId, card, user.uid)}
                key={card.id}
                s={2}
                m={2}
                style={{ paddingBottom: '15px' }}
              >
                <SingleCard card={card} />
              </Col>
            ))
          }
          <hr />
          {playerInfo.cards &&
            Object.values(playerInfo.cards).map(card => (
              <Col
                onClick={() => this.props.addToDeck(battleId, card, user.uid)}
                key={card.id}
                s={2}
                m={2}
                style={{ paddingBottom: '15px' }}
              >
                <SingleCard card={card} />
              </Col>
            ))
          }
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
  listenBattleInfo: () =>
    ref(`/battles/${connector.props.battleId}`).on(
      setEventType('value'),
      snapshot => {
        connector.setState({ battleInfo: snapshot.val() })
      }
    )
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
          p1uid: uid,
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
          p2uid: uid,
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
  addToDeck(battleId, card, uid) {
    ref(`/battles/${battleId}`).once('value', snapshot => {
      const battle = snapshot.val()
      if (battle.p1uid === uid) {
        ref(`battles/${battleId}/p1/${uid}/deck/`).once('value', snapshot => {
          if (snapshot.numChildren() < 5) {
            ref(`battles/${battleId}/p1/${uid}/deck/`).child(card.id).set(card)
            ref(`battles/${battleId}/p1/${uid}/cards/${card.id}`).remove()
          }
        })
      } else if (battle.p2uid === uid) {
        ref(`battles/${battleId}/p2/${uid}/deck/`).once('value', snapshot => {
          if (snapshot.numChildren() < 5) {
            ref(`battles/${battleId}/p2/${uid}/deck/`).child(card.id).set(card)
            ref(`battles/${battleId}/p2/${uid}/cards/${card.id}`).remove()
          }
        })
      }
    })
  },
  removeFromDeck(battleId, card, uid) {
    ref(`/battles/${battleId}`).once('value', snapshot => {
      const battle = snapshot.val()
      if (battle.p1uid === uid) {
        ref(`battles/${battleId}/p1/${uid}/cards/`).child(card.id).set(card)
        ref(`battles/${battleId}/p1/${uid}/deck/${card.id}`).remove()
      } else if (battle.p2uid === uid) {
        ref(`battles/${battleId}/p2/${uid}/cards/`).child(card.id).set(card)
        ref(`battles/${battleId}/p2/${uid}/deck/${card.id}`).remove()
      }
    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(
  withRouter(StagingArea)
)