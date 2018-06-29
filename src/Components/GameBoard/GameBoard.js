import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect';

import Deck from './Deck';
import Spinner from '../Loader/Spinner'
import './GameBoard.css'

class GameBoard extends Component {
  render() {
    
    if (!this.props.game) {
      return <Spinner />
    }
    console.log(Object.keys(this.props.game.p1)[0]);
    return (
      <div className="game-container">
        <div className="player1-board-deck">
          {/* TODO: GET CARDBACK PLACEHOLDERS */}
        </div>
        <div className="gameboard-player1">
          <h1>P1 GameBoard Placeholder</h1>
        </div>
        <hr />
        <div className="gameboard-player2">
          <h1>P2 GameBoard Placeholder</h1>
        </div>
        <div className="player2-board-deck">
          {this.props.user.uid === Object.keys(this.props.game.p1)[0]
            ? <Deck {...this.props.game.p1.TlgEFiyrHcYPFJKjVPaqYBzWWrs1} />
            : <Deck {...this.props.game.p2.caCrOjoGxEamloCVeLGfcDtJDS92} />}
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

const addDispatcher = (connector, ref) => ({

})

export default firebaseConnect(addListener, addDispatcher)(GameBoard)
