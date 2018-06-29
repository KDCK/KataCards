import React, {Component} from 'react'
import {firebaseConnect} from 'fire-connect'
import {Button} from 'react-materialize'
import {Link} from 'react-router-dom'
import './Home.css'

class Home extends Component {
  joinQueue(user) {
    this.props.queueUser(user)
  }

  startBattle(user, queue, battles) {
    this.props.joinBattle(user, queue, battles)
  }

  render() {
    // console.log('PROPPPPPPPSSSSSSSS', this.props)
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
              Join Battle Queue
            </Button>
          </div>
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
      const player1 = queue[player1Id]
      const player2 = queue[player2Id]
      newBattle = {
        [queuedPlayers[0]]: player1,
        // p1UID: player1Id,
        [queuedPlayers[1]]: player2
        // p2UID: player2Id
      }
    }
    ref(`/queue/${queuedPlayers[0]}`).remove()
    ref(`/queue/${queuedPlayers[1]}`).remove()

    // console.log('BATTLESSSSSSSSSSSS', battles)
    // const randomPlayerTurn = Math.random()
    // const battleArray = []

    // if (!battles) {
    //   let newBattle = {
    //     p1: user,
    //     p2: null,
    //     p1atk: null,
    //     p1def: null,
    //     p2atk: null,
    //     p2def: null,
    //     turn: randomPlayerTurn < 0.5 ? 'p1' : 'p2'
    //   }

    let newBattleKey = ref('battles').push().key
    let updates = {}

    updates[`/battles/${newBattleKey}`] = newBattle
    updates[`/users/${queuedPlayers[0]}/in_battle`] = newBattleKey
    updates[`/users/${queuedPlayers[1]}/in_battle`] = newBattleKey

    ref().update(updates)
    // ref(`/battles/${newBattleKey}/${connector.props.user.uid}`).push(user)

    // for (let key in battles) {
    //   battleArray.push(battles[key])
    // }

    // console.log('BATTLEARRAY', battleArray)
    // const foundBattle = battleArray.find(battle => !battle.p2)
    // console.log('FOUNDBATTLE', foundBattle)
    // if (!foundBattle) {
    //   ref(`battles`)
    //     .push()
    //     .set({
    //       p1: user,
    //       p2: null,
    //       p1atk: null,
    //       p1def: null,
    //       p2atk: null,
    //       p2def: null,
    //       turn: randomPlayerTurn < 0.5 ? 'p1' : 'p2'
    //     })
    // }
  }
})

export default firebaseConnect(addListener, addDispatcher)(Home)
