import React, {Component} from 'react'
import {firebaseConnect} from 'fire-connect'
import {Button} from 'react-materialize'
import {Link} from 'react-router-dom'
import './Home.css'

class Home extends Component {
  handleClick(user, battles) {
    this.props.queueUser(user)
    this.props.joinBattle(user, battles)
  }

  render() {
    console.log('PROPPPPPPPSSSSSSSS', this.props)
    return (
      <div>
        <img className="home-img" alt="home background" src="home.png" />
        <div className="home-buttons">
          <div className="home-buttons-top">
            <Button
              large
              className="home-button"
              waves="purple"
              onClick={() =>
                this.handleClick(this.props.user, this.props.battles)
              }
            >
              Join Battle
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
    ref('queue').on(setEventType('value'), snapshot => {
      connector.setState({queue: snapshot.val()})
    }),
  listenBattle: () =>
    ref('battles').on(setEventType('value'), snapshot => {
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
  joinBattle(user, battles) {
    console.log('BATTLESSSSSSSSSSSS', battles)
    const randomPlayerTurn = Math.random()
    const battleArray = []

    if (!battles) {
      ref(`battles`)
        .push()
        .set({
          p1: user,
          p2: null,
          p1atk: null,
          p1def: null,
          p2atk: null,
          p2def: null,
          turn: randomPlayerTurn < 0.5 ? 'p1' : 'p2'
        })
    } else {
      for (let key in battles) {
        battleArray.push(battles[key])
      }
      console.log('BATTLEARRAY', battleArray)
      const foundBattle = battleArray.find(battle => !battle.p2)
      console.log('FOUNDBATTLE', foundBattle)
    }
  }
})

export default firebaseConnect(addListener, addDispatcher)(Home)
