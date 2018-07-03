import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { Row, Col } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import SingleCard from '../Cards/SingleCard.js'
import Spinner from '../Loader/Spinner.js'

import './StagingArea.css'

class StagingArea extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.player && !prevProps.player) {
      const { player, user } = this.props
      this.props.initializeBattle(player.in_battle, player, user.uid)
    }

    if (this.props.allReady(this.props.battleId)) {
      this.props.history.push(`/battle/${this.props.battleId}`)
    }
  }

  render() {
    if (!(this.props.battleInfo && this.props.player && this.props.user)) return <Spinner />
    const { battleInfo, user, battleId } = this.props
    const { uid } = user
    if (typeof battleInfo.p1 !== 'object' || typeof battleInfo.p2 !== 'object') return <Spinner />

    const playerInfo = (battleInfo.p1).hasOwnProperty(user.uid) ? battleInfo.p1[user.uid] : battleInfo.p2[user.uid]
    let readyButton = this.props.checkDeckLength(this.props.battleId, uid)//less than 3 returns undefined...bug

    return (
      <div className="staging-area-main">
        <div>
          <h1>Welcome to the Staging Area</h1>
          <h3>Select 5 cards for your battle deck!<span style={{ fontSize: 12, paddingLeft: 40 }}> Waiting for Opponent</span></h3>
          <Button onClick={() => this.props.setReady(this.props.battleId, uid)} disabled={readyButton}>Ready</Button>
        </div>
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
    ),
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
          p1ready: false,
          p2ready: false,
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
          p1ready: false,
          p2ready: false,
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
  },
  checkDeckLength(battleId, uid) {
    let result
    ref(`battles/${battleId}`).once('value', snapshot => {
      const battle = snapshot.val()
      if (battle.p1uid === uid) {
        const deck = battle.p1[uid].deck
        if (!deck) {
          result = true
        } else {
          if (deck.length < 5) {
            result = true
          } else if (deck.length === 5) {
            result = false
          }
        }
      } else if (battle.p2uid === uid) {
        const deck = battle.p2[uid].deck
        if (!deck) {
          result = true
        } else {
          if (deck.length < 5) {
            result = true
          } else if (deck.length === 5) {
            result = false
          }
        }
      }
    })
    return result
  },
  setReady(battleId, uid) {
    ref(`battles/${battleId}`).once('value', snapshot => {
      const battle = snapshot.val()
      console.log("Battle", battle);
      if (battle.p1uid === uid) {
        ref(`battles/${battleId}/`).update({ p1ready: true })
      } else if (battle.p2uid === uid) {
        ref(`battles/${battleId}/`).update({ p2ready: true })
      }
    })
  },
  allReady(battleId) {
    let result = false
    ref(`battles/${battleId}`).once('value', snapshot => {
      const battle = snapshot.val()

      if (battle.p1ready && battle.p2ready) {
        result = true
      }
    })
    return result;
  }
})

export default firebaseConnect(addListener, addDispatcher)(
  withRouter(StagingArea)
)
