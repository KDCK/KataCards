import React, {Component} from 'react'
import {firebaseConnect} from 'fire-connect'
import {Button} from 'react-materialize'
import {withRouter, Link} from 'react-router-dom'
import './Home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {waiting: false}
  }
  joinQueue(user) {
    this.setState({waiting: true})
    this.props.queueUser(user)
  }

  async startBattle(user, queue, battles) {
    await this.props.joinBattle(user, queue, battles)
    this.props.history.push('/stagingarea')
  }

  render() {
    return (
      <div>
        <img className="home-img" alt="home background" src="home.png" />
        <div className="home-buttons">
          <div className="home-buttons-top">
            <Button
              large
              className="home-button"
              waves="purple"
              onClick={() => this.joinQueue(this.props.user)}
            >
              {this.state.waiting
                ? 'Waiting For Match...'
                : 'Join Battle Queue'}
            </Button>
          </div>
          {(this.props.queue && Object.keys(this.props.queue).length >= 2) ||
          (this.props.user.in_battle !== false &&
            this.props.user.in_battle !== 'waiting') ? (
            <div className="home-buttons-top">
              <Button
                large
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
          ) : null}
          <div className="home-buttons-bottom">
            <Link to="/userdeck">
              <Button className="home-button" waves="purple">
                My Deck
              </Button>
            </Link>
            <Link to="/profile">
              <Button className="home-button" waves="purple">
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
        connector.setState({user: snapshot.val()})
      }
    ),
  listenQueue: () =>
    ref('/queue').on(setEventType('value'), snapshot => {
      connector.setState({queue: snapshot.val()})
    }),
  listenBattle: () =>
    ref('/battles').on(setEventType('value'), snapshot => {
      connector.setState({battles: snapshot.val()})
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
    }
  }
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(Home))
