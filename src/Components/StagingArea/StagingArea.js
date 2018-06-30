import React, {Component} from 'react'
import {firebaseConnect} from 'fire-connect'
import {db} from '../../firebase'
import {Button} from 'react-materialize'
import {withRouter, Link} from 'react-router-dom'

class StagingArea extends Component {
  constructor(props){
    super(props)

    this.state = {}
  }
  async componentDidUpdate() {
    if (!this.state.firstUpdate){
      let battleId = this.props.history.location.pathname.slice(13)
      this.props.initialBattleUpdate(battleId, this.props.user, this.props.auth.currentUser.uid)
      this.setState({firstUpdate: true})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.battle){
      if(
        (nextProps.battle.p1 === this.props.auth.currentUser.uid &&
          nextProps.battle.p2 !== this.props.auth.currentUser.uid
        ) ||
        (nextProps.battle.p2 === this.props.auth.currentUser.uid &&
          nextProps.battle.p1 !== this.props.auth.currentUser.uid
       )
       ) {
          return true
        }
    } else {
        return false
    }
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Staging Area</h1>
        <p>Select your deck!</p>
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`/users/${connector.props.auth.currentUser.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({user: snapshot.val()})
    }),
  listenBattle: () =>
    ref('/battles').on(setEventType('child_added'), snapshot => {
      connector.setState({battle: snapshot.val()})
    })
})

const addDispatcher = (connector, ref) => ({
  initialBattleUpdate(battleId, user, uid) {
    db.ref(`battles`).once('value', snapshot => {
      let battle = snapshot.child(battleId).val()
      if(battle.p1 === uid){
        ref(`/battles/${battleId}`).update({
          p1: user,
          p1done: false,
          p2done: false,
          p1atk: 0,
          p2atk: 0,
          p1def: 0,
          p2def: 0,
          ready: false,
          turn: 'playerOne'
        })
      } else {
          ref(`/battles/${battleId}`).update({
            p2: user,
            p1done: false,
            p2done: false,
            p1atk: 0,
            p2atk: 0,
            p1def: 0,
            p2def: 0,
            ready: false,
            turn: 'playerOne'
          })
      }
    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(StagingArea))
