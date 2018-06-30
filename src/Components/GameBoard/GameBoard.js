import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { Image } from 'semantic-ui-react'

import Deck from './Deck'
import Board from './Board'
import DisplayStatus from './DisplayStatus';
import Spinner from '../Loader/Spinner'
import './GameBoard.css'

class GameBoard extends Component {
  componentDidUpdate() {
    this.props.checkDeck()
  }
  render() {
    if (!this.props.game) {
      return <Spinner />
    }

    const { playedCard, game, setTurn, setReady, user } = this.props

    if (game.p1done && game.p2done) {
      return <Image src='/gameover.gif' />
    }

    if (!game.ready) {
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
          {user.uid === Object.keys(game.p2)[0]
            ? <Board {...game.p1.TlgEFiyrHcYPFJKjVPaqYBzWWrs1} />
            : <Board {...game.p2.caCrOjoGxEamloCVeLGfcDtJDS92} />}
        </div>
        {user.uid === Object.keys(game.p2)[0]
          ? <DisplayStatus atk={game.p1atk} def={game.p1def} />
          : <DisplayStatus atk={game.p2atk} def={game.p2def} />}
        <hr />
        {user.uid === Object.keys(game.p1)[0]
          ? <DisplayStatus atk={game.p1atk} def={game.p1def} />
          : <DisplayStatus atk={game.p2atk} def={game.p2def} />}
        <div className="gameboard-player2">
          {user.uid === Object.keys(game.p1)[0]
            ? <Board {...game.p1.TlgEFiyrHcYPFJKjVPaqYBzWWrs1} />
            : <Board {...game.p2.caCrOjoGxEamloCVeLGfcDtJDS92} />}
        </div>
        <div className="player2-board-deck">
          {user.uid === Object.keys(game.p1)[0]
            ? <Deck {...game.p1.TlgEFiyrHcYPFJKjVPaqYBzWWrs1} turn={game.turn} playedCard={playedCard} />
            : <Deck {...game.p2.caCrOjoGxEamloCVeLGfcDtJDS92} turn={game.turn} playedCard={playedCard} />}
        </div>
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenToGame: () => ref('/game/specialid').on(setEventType('value'), snapshot => {
    connector.setState({ game: snapshot.val() })
  })
})

const addDispatcher = (connector, ref, user) => ({
  checkDeck() {
    ref(`/game/specialid/p1/${user.uid}/`).once('value', snapshot => {
      if (snapshot.exists() && snapshot.child('/board').exists()) {
        ref(`/game/specialid/p1/${user.uid}/board`).once('value', snapshot => {
          if (snapshot.numChildren() >= 3) {
            ref(`/game/specialid/p1done`).set(true)
          }
        })
      }
    })
    ref(`/game/specialid/p2/${user.uid}/`).once('value', snapshot => {
      if (snapshot.exists() && snapshot.child('/board').exists()) {
        ref(`/game/specialid/p2/${user.uid}/board`).once('value', snapshot => {
          if (snapshot.numChildren() >= 3) {
            ref(`/game/specialid/p2done`).set(true)
          }
        })
      }
    })
  },
  playedCard(cardId, turn, atk, def) {
    ref(`/game/specialid/p1/${user.uid}/`).once('value', snapshot => {
      if (!snapshot.exists() && turn === 'playerTwo') {
        ref(`/game/specialid/p2/${user.uid}/deck/${cardId}`).once('value', snapshot => {
          const card = snapshot.val()
          ref(`/game/specialid/p2/${user.uid}/board/${card.id}`).set(card)
        })
        ref(`/game/specialid/p2atk`).once('value', snapshot => {
          const prevAtk = snapshot.val()
          ref(`/game/specialid/p2atk`).set(prevAtk + atk)
        })
        ref(`/game/specialid/p2def`).once('value', snapshot => {
          const prevDef = snapshot.val()
          ref(`/game/specialid/p2def`).set(prevDef + def)
        })
        ref(`/game/specialid/p2/${user.uid}/deck/${cardId}`).remove()
        ref(`/game/specialid/turn`).set('playerOne')
      } else if (snapshot.exists() && turn === 'playerOne') {
        ref(`/game/specialid/p1/${user.uid}/deck/${cardId}`).once('value', snapshot => {
          const card = snapshot.val()
          ref(`/game/specialid/p1/${user.uid}/board/${card.id}`).set(card)
        })
        ref(`/game/specialid/p1atk`).once('value', snapshot => {
          const prevAtk = snapshot.val()
          ref(`/game/specialid/p1atk`).set(prevAtk + atk)
        })
        ref(`/game/specialid/p1def`).once('value', snapshot => {
          const prevDef = snapshot.val()
          ref(`/game/specialid/p1def`).set(prevDef + def)
        })
        ref(`/game/specialid/p1/${user.uid}/deck/${cardId}`).remove()
        ref(`/game/specialid/turn`).set('playerTwo')
      }
    })
  },
  setTurn(whosTurn) {
    ref(`/game/specialid/turn`).set(whosTurn)
  },
  setReady() {
    ref(`/game/specialid/ready`).set(true)
  }
})

export default firebaseConnect(addListener, addDispatcher)(GameBoard)
