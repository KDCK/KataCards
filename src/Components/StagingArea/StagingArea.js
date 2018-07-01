import React, {Component} from 'react'
import {firebaseConnect} from 'fire-connect'
import {db} from '../../firebase'
import {Row, Col} from 'react-materialize'
import {withRouter, Link} from 'react-router-dom'

import SingleCard from '../Cards/SingleCard.js'
import Spinner from '../Loader/Spinner.js'

import './StagingArea.css'

class StagingArea extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deck: []
    }
  }
  async componentDidUpdate() {
    if (this.props.player && !this.state.firstUpdate) {
      let battleId = this.props.history.location.pathname.slice(13)
      this.props.initialBattleUpdate(
        battleId,
        this.props.player,
        this.props.auth.currentUser.uid
      )
      this.setState({firstUpdate: true})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.battle) {
      if (
        (nextProps.battle.p1 === this.props.auth.currentUser.uid &&
          nextProps.battle.p2 !== this.props.auth.currentUser.uid) ||
        (nextProps.battle.p2 === this.props.auth.currentUser.uid &&
          nextProps.battle.p1 !== this.props.auth.currentUser.uid)
      ) {
        return true
      }
    }
    return false
  }

  render() {
    console.log('PROPSSSSS', this.props)
    return (
      <div className="staging-area-main">
        <h1>Welcome to the Staging Area</h1>
        <h3>Select your deck!</h3>
        <Row>
          {!this.props.player ? (
            <Spinner />
          ) : (
            this.props.player.cards.map(card => (
              <Col key={card.id} s={2} m={2} style={{paddingBottom: '15px'}}>
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
    ref(`/users/${connector.props.auth.currentUser.uid}`).on(
      setEventType('value'),
      snapshot => {
        connector.setState({player: snapshot.val()})
      }
    ),
  listenBattle: () =>
    ref('/battles').on(setEventType('child_added'), snapshot => {
      connector.setState({battle: snapshot.val()})
    })
})

const addDispatcher = (connector, ref) => ({
  initialBattleUpdate(battleId, user, uid) {
    ref(`battles`).once('value', snapshot => {
      let battle = snapshot.child(battleId).val()
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
  updateBattleDeck(battleId, user, uid) {
    // TO-DO
  }
})

export default firebaseConnect(addListener, addDispatcher)(
  withRouter(StagingArea)
)
