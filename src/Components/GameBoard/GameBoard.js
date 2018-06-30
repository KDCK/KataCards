import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'

import Deck from './Deck'
import Board from './Board'
import Spinner from '../Loader/Spinner'
import './GameBoard.css'
import { Image } from 'semantic-ui-react';

class GameBoard extends Component {
  render() {
    if (!this.props.game) {
      return <Spinner />
    }
    if(this.props.game.p1done && this.props.game.p2done) {
      return <Image src='/gameover.gif' />
    }
    return (
      <div className="game-container">
        <div className="player1-board-deck">
          {/* TODO: GET CARDBACK PLACEHOLDERS */}
        </div>
        <div className="gameboard-player1">
          {this.props.user.uid === Object.keys(this.props.game.p2)[0]
            ? <Board {...this.props.game.p1.TlgEFiyrHcYPFJKjVPaqYBzWWrs1} />
            : <Board {...this.props.game.p2.caCrOjoGxEamloCVeLGfcDtJDS92} />}
        </div>
        <hr />
        <div className="gameboard-player2">
          {this.props.user.uid === Object.keys(this.props.game.p1)[0]
            ? <Board {...this.props.game.p1.TlgEFiyrHcYPFJKjVPaqYBzWWrs1} />
            : <Board {...this.props.game.p2.caCrOjoGxEamloCVeLGfcDtJDS92} />}
        </div>
        <div className="player2-board-deck">
          {this.props.user.uid === Object.keys(this.props.game.p1)[0]
            ? <Deck {...this.props.game.p1.TlgEFiyrHcYPFJKjVPaqYBzWWrs1} playedCard={this.props.playedCard} />
            : <Deck {...this.props.game.p2.caCrOjoGxEamloCVeLGfcDtJDS92} playedCard={this.props.playedCard} />}
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
  playedCard(cardId) {
    ref(`/game/specialid/p1/${user.uid}/`).once('value', snapshot => {
      if (!snapshot.exists()) {
        ref(`/game/specialid/p2/${user.uid}/deck/${cardId}`).once('value', snapshot => {
          const card = snapshot.val()
          ref(`/game/specialid/p2/${user.uid}/board/${card.id}`).set(card)
        })
        ref(`/game/specialid/p2/${user.uid}/deck/${cardId}`).remove()
      } else if (snapshot.exists()) {
        ref(`/game/specialid/p1/${user.uid}/deck/${cardId}`).once('value', snapshot => {
          const card = snapshot.val()
          ref(`/game/specialid/p1/${user.uid}/board/${card.id}`).set(card)
        })
        ref(`/game/specialid/p1/${user.uid}/deck/${cardId}`).remove()
      }
    })
    this.checkDeck()
  },
  checkDeck() {
    ref(`/game/specialid/p1/${user.uid}/`).once('value', snapshot => {
      if (snapshot.exists() && !snapshot.child('/deck').exists()) {
        ref(`/game/specialid/p1done`).set('true')
      }
    })
    ref(`/game/specialid/p2/${user.uid}/`).once('value', snapshot => {
      if (snapshot.exists() && !snapshot.child('/deck').exists()) {
        ref(`/game/specialid/p2done`).set('true')
      }
    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(GameBoard)
