import React, {Component} from 'react'
import { firebaseConnect } from 'fire-connect';

import './GameBoard.css'

class GameBoard extends Component {
  render() {
    console.log(this.props);
    
    return (
      <div className="game-container">
        <div className="player1-board-deck">
          <h1>Player1 Deck Placeholder</h1>
        </div>
        <div className="gameboard-player1">
          <h1>P1 GameBoard Placeholder</h1>
        </div>
        <hr />
        <div className="gameboard-player2">
          <h1>P2 GameBoard Placeholder</h1>
        </div>
        <div className="player2-board-deck">
          <h1>Player2 Deck Placeholder</h1>
        </div>
      </div>
    )
  }
}

export default firebaseConnect()(GameBoard)
