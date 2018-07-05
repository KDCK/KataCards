import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { Divider } from 'semantic-ui-react'

import Deck from './Deck'
import Board from './Board'
import DisplayStatus from './DisplayStatus';
import Spinner from '../Loader/Spinner'
import GameOver from './GameOver'
import './GameBoard.css'


class GameBoard extends Component {
  constructor(props){
    super(props)
    this.state = { gameOverComponent: 'still playing' }
    this.showOutcome = this.showOutcome.bind(this)
    this.delayedRender = this.delayedRender.bind(this)
  }


  showOutcome() {
    this.setState({ gameOverComponent: 'delay' })
  }

  delayedRender() {
    setTimeout(() => {
      this.setState({ gameOverComponent: 'ready'})
    }, 5000)
  }

  componentDidUpdate() {
    this.props.checkDeck()
  }

  render() {
    if (!this.props.battle) {
      return <Spinner />
    }

    const { playedCard, battle, setTurn, setReady, user } = this.props
    const p1uid = Object.keys(battle.p1)[0]
    const p2uid = Object.keys(battle.p2)[0]


    if (battle.p1done && battle.p2done) {
      if (this.state.gameOverComponent === 'still playing'){
        this.showOutcome()
      } else if (this.state.gameOverComponent === 'ready') {
          return <GameOver battle={battle} />
      } else {
          this.delayedRender()
      }
    }
    if (!battle.ready) {
      const turn = Math.random() >= 0.5
      turn ? setTurn('playerOne') : setTurn('playerTwo')
      setReady()
    }

    return (
      <div className="game-container">
        <div className="player1-board-deck">
          {/* TODO: GET CARDBACK PLACEHOLDERS */}
        </div>
        <div className="gameboard-player1">
          {user.uid === p2uid
            ? <Board {...battle.p1[p1uid]} />
            : <Board {...battle.p2[p2uid]} />}
        </div>
        {user.uid === p2uid
          ? (<DisplayStatus atk={battle.p1atk} def={battle.p1def} self={true} turn={battle.turn} />)
          : (<DisplayStatus atk={battle.p2atk} def={battle.p2def} self={true} turn={battle.turn} />)}
        <Divider inverted fitted>
          {(this.props.battle.p1done && this.props.battle.p2done)
          ? 'Game Over'
          : (user.uid === p1uid && battle.turn === 'playerOne')
            ? 'Your Turn'
            : (user.uid === p2uid && battle.turn === 'playerTwo')
              ? 'Your Turn'
              : 'Opponent\'s Turn'}
        </Divider>
        {this.props.battle.p1done && this.props.battle.p2done ?
        <div className='game-over'>
          Player One Score: {this.props.battle.p1atk - this.props.battle.p2def} <br />
          Player Two Score: {this.props.battle.p2atk - this.props.battle.p1def}
          </div> : null}
        {user.uid === p1uid
          ? (<DisplayStatus atk={battle.p1atk} def={battle.p1def} self={false} turn={battle.turn} />)
          : (<DisplayStatus atk={battle.p2atk} def={battle.p2def} self={false} turn={battle.turn} />)}
        <div className="gameboard-player2">
          {user.uid === p1uid
            ? <Board {...battle.p1[p1uid]} />
            : <Board {...battle.p2[p2uid]} />}
        </div>
        <div className="player2-board-deck">
          {user.uid === p1uid
            ? <Deck {...battle.p1[p1uid]} turn={battle.turn} playedCard={playedCard} />
            : <Deck {...battle.p2[p2uid]} turn={battle.turn} playedCard={playedCard} />}
        </div>
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenToBattle: () => ref(`/battles/${connector.props.battleId}`).on(setEventType('value'), snapshot => {
    connector.setState({ battle: snapshot.val() })
  })
})

const addDispatcher = (connector, ref, user) => ({
  checkDeck() {
    ref(`/battles/${connector.props.battleId}/p1/${user.uid}/`).once('value', snapshot => {
      if (snapshot.exists() && snapshot.child('/board').exists()) {
        ref(`/battles/${connector.props.battleId}/p1/${user.uid}/board`).once('value', snapshot => {
          if (snapshot.numChildren() >= 5) {
            ref(`/battles/${connector.props.battleId}/p1done`).set(true)
          }
        })
      }
    })
    ref(`/battles/${connector.props.battleId}/p2/${user.uid}/`).once('value', snapshot => {
      if (snapshot.exists() && snapshot.child('/board').exists()) {
        ref(`/battles/${connector.props.battleId}/p2/${user.uid}/board`).once('value', snapshot => {
          if (snapshot.numChildren() >= 5) {
            ref(`/battles/${connector.props.battleId}/p2done`).set(true)
          }
        })
      }
    })
  },
  playedCard(cardId, turn, atk, def) {
    ref(`/battles/${connector.props.battleId}/p1/${user.uid}/`).once('value', snapshot => {
      if (!snapshot.exists() && turn === 'playerTwo') {
        ref(`/battles/${connector.props.battleId}/p2/${user.uid}/deck/${cardId}`).once('value', snapshot => {
          const card = snapshot.val()
          ref(`/battles/${connector.props.battleId}/p2/${user.uid}/board/${card.id}`).set(card)
        })
        ref(`/battles/${connector.props.battleId}/p2atk`).once('value', snapshot => {
          const prevAtk = snapshot.val()
          ref(`/battles/${connector.props.battleId}/p2atk`).set(prevAtk + atk)
        })
        ref(`/battles/${connector.props.battleId}/p2def`).once('value', snapshot => {
          const prevDef = snapshot.val()
          ref(`/battles/${connector.props.battleId}/p2def`).set(prevDef + def)
        })
        ref(`/battles/${connector.props.battleId}/p2/${user.uid}/deck/${cardId}`).remove()
        ref(`/battles/${connector.props.battleId}/turn`).set('playerOne')
      } else if (snapshot.exists() && turn === 'playerOne') {
        ref(`/battles/${connector.props.battleId}/p1/${user.uid}/deck/${cardId}`).once('value', snapshot => {
          const card = snapshot.val()
          ref(`/battles/${connector.props.battleId}/p1/${user.uid}/board/${card.id}`).set(card)
        })
        ref(`/battles/${connector.props.battleId}/p1atk`).once('value', snapshot => {
          const prevAtk = snapshot.val()
          ref(`/battles/${connector.props.battleId}/p1atk`).set(prevAtk + atk)
        })
        ref(`/battles/${connector.props.battleId}/p1def`).once('value', snapshot => {
          const prevDef = snapshot.val()
          ref(`/battles/${connector.props.battleId}/p1def`).set(prevDef + def)
        })
        ref(`/battles/${connector.props.battleId}/p1/${user.uid}/deck/${cardId}`).remove()
        ref(`/battles/${connector.props.battleId}/turn`).set('playerTwo')
      }
    })
  },
  setTurn(whosTurn) {
    ref(`/battles/${connector.props.battleId}/turn`).set(whosTurn)
  },
  setReady() {
    ref(`/battles/${connector.props.battleId}/ready`).set(true)
  }
})

export default firebaseConnect(addListener, addDispatcher)(GameBoard)
