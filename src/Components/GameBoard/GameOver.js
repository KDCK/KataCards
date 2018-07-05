import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { firebaseConnect } from 'fire-connect'
import { withRouter } from 'react-router-dom'



import './gameover.css'

class GameOver extends Component {
  returnHome(res, uid, gold, totalWins) {
    this.props.updateUserObj(res, uid, gold, totalWins)
    this.props.battleStatus(uid)
    this.props.history.push('/home')
  }


  render() {
    const { p1atk, p1def, p2atk, p2def } = this.props.battle
    const p1Total = p1atk - p2def
    const p2Total = p2atk - p1def
    const winner = p1Total > p2Total ? Object.keys(this.props.battle.p1)[0] : Object.keys(this.props.battle.p2)[0]
    const result = winner === this.props.user.uid ? 'You Win\n You earned 1 gold' : 'You Lose'

    return (
      <div>
        <div className="gameover-card">
          <h1>{result}</h1>
          <div className="gameover-buttons">
            <Button onClick={() => this.returnHome(result, this.props.user.uid, this.props.currentUser.gold, this.props.currentUser.total_wins)}>Home</Button>
          </div>
        </div>
        <img className="gameover-img" alt="" src='/gameover.gif' />
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () => ref(`/users/${connector.props.user.uid}`).on(setEventType('value'), snapshot => {
    connector.setState({ currentUser: snapshot.val() })
  })
})

const addDispatcher = (connector, ref) => ({
  updateUserObj(res, uid, gold, totalWins) {
    if (res === 'You Win') {
      ref(`users/${uid}`).update({
        gold: gold + 1,
        total_wins: totalWins + 1,
      })
    }
  },
  battleStatus(uid) {
    ref(`users/${uid}`).update({
      in_battle: false,
    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(GameOver))
