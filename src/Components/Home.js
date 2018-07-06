import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { firebaseConnect } from 'fire-connect'
import { Button } from 'react-materialize'
import { withRouter, Link } from 'react-router-dom'

import { db } from '../firebase'
import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { waiting: false, matchReady: false }
  }

  componentDidMount() {
    this.props.setBattleFalse()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.queue && Object.keys(this.props.queue).length >= 2) {
        this.setState({ waiting: false, matchReady: true })
      }
    }
  }

  joinQueue(user) {
    this.setState({ waiting: true })
    this.props.queueUser(user)
  }

  leaveQueue(user) {
    this.setState({ waiting: false })
    this.props.dequeueUser(user)
  }

  async startBattle(user, queue, battles) {
    let newBattle = null
    if (this.props.queue && Object.keys(this.props.queue).length >= 2) {
      newBattle = await this.props.joinBattle(user, queue, battles)
      this.props.history.push(`/stagingarea/${newBattle}`)
    } else {
      db.ref('/battles').on('child_added', snapshot => {
        newBattle = snapshot.key
      })

      this.props.history.push(`/stagingarea/${newBattle}`)
    }
  }

  render() {
    return (
      <div>
        <ReactPlayer
          style={{ display: 'none' }}
          url="https://www.youtube.com/watch?v=P2pBVwZNkH8"
          playing
          looping
        />
        <img className="home-img" alt="home background" src="battle.gif" />
        <div className="home-buttons">
          <div className="code-wars-home">
            <h6>
              Train your skills at Codewars.com <br /> to earn gold and buy
              better cards for your deck!
            </h6>
            <div>
              <Button
                style={{ width: '200px' }}
                target="_blank"
                waves="light"
                node="a"
                href="http://www.codewars.com"
              >
                Codewars.com
              </Button>
            </div>
          </div>
          <div className="home-buttons-top">
            {this.state.matchReady && (
              <h2 className="queue-status">Match Found</h2>
            )}
            {this.state.waiting && (
              <h2 className="queue-status animated">Finding a match...</h2>
            )}
            {!this.state.waiting &&
              !this.state.matchReady && (
                <Button
                  large
                  className="home-button"
                  waves="purple"
                  onClick={() => this.joinQueue(this.props.user)}
                >
                  Join Battle Queue
                </Button>
              )}
            {this.state.waiting && (
              <Button
                className="home-button"
                onClick={() => this.leaveQueue(this.props.user)}
              >
                Leave Queue
              </Button>
            )}
          </div>
          {this.state.matchReady && (
            <div className="home-buttons-top">
              <Button
                large
                style={{ animation: 'glowing 1500ms infinite' }}
                className="home-button"
                waves="purple"
                onClick={() =>
                  this.startBattle(
                    this.props.user,
                    this.props.queue,
                    this.props.battles
                  )
                }
              >
                Start Battle!
              </Button>
            </div>
          )}
          <div className="home-buttons-bottom">
            <Link to="/cardstore">
              <Button className="home-button-deck" waves="purple">
                Buy New Cards
              </Button>
            </Link>
            <Link to="/profile">
              <Button className="home-button-profile" waves="purple">
                My Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`/users/${connector.props.user.uid}`).on(
      setEventType('value'),
      snapshot => {
        connector.setState({ user: snapshot.val() })
      }
    ),
  listenQueue: () =>
    ref('/queue').on(setEventType('value'), snapshot => {
      connector.setState({ queue: snapshot.val() })
    }),
  listenBattle: () =>
    ref('/battles').on(setEventType('value'), snapshot => {
      connector.setState({ battles: snapshot.val() })
    })
})

const addDispatcher = (connector, ref) => ({
  queueUser(user) {
    if (!user.in_battle) {
      ref(`/queue/${connector.props.user.uid}`)
        .push()
        .set(user)
      ref(`/users/${connector.props.user.uid}`).update({
        in_battle: 'waiting'
      })
    }
  },
  dequeueUser(user) {
    if (user.in_battle) {
      ref(`queue/${connector.props.user.uid}`).remove()
      ref(`users/${connector.props.user.uid}`).update({ in_battle: false })
    }
  },
  joinBattle(user, queue, battles) {
    const queueLength = Object.keys(queue).length
    const queuedPlayers = Object.keys(queue)
    let newBattle = {}
    if (queueLength >= 2) {
      const player1Id = queuedPlayers[0]
      const player2Id = queuedPlayers[1]
      newBattle = {
        p1: player1Id,
        p2: player2Id
      }
      ref(`/queue/${queuedPlayers[0]}`).remove()
      ref(`/queue/${queuedPlayers[1]}`).remove()

      let newBattleKey = ref('battles').push().key
      let updates = {}
      updates[`/battles/${newBattleKey}`] = newBattle
      updates[`/users/${queuedPlayers[0]}/in_battle`] = newBattleKey
      updates[`/users/${queuedPlayers[1]}/in_battle`] = newBattleKey

      ref().update(updates)
      return newBattleKey
    }
  },
  setBattleFalse() {
    ref(`users/${connector.props.user.uid}`).update({ in_battle: false })
  }
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(Home))
