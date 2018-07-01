import React, { Component } from 'react'
import Spinner from '../Loader/Spinner'
import { Link } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'
import { firebaseConnect } from 'fire-connect'


import './gameover.css'

const GameOver = (props) => {
  const { p1atk, p1def, p2atk, p2def } = props.battle
  const p1Total = p1atk - p2def
  const p2Total = p2atk - p1def

  const winner = p1Total > p2Total ? Object.keys(props.battle.p1)[0] : Object.keys(props.battle.p2)[0]

  const result = winner === props.user.uid ? 'You Win' : 'You Lose'

  return(
    <div>
      <div className="gameover-card">
        <h1>{result}</h1>
        <div className="gameover-buttons">
          <Button onClick={()=>alert('JOINBATTLE')}>Join Battle</Button>
          <Link to="/home"><Button>Home</Button></Link>
        </div>
      </div>
      <img className="gameover-img" src='/gameover.gif'/>
    </div>
  )
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () => ref(`/users/${connector.props.user.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({ currentUser: snapshot.val() })
  })
})

const addDispatcher = (connector, ref) =>({
   queueUser(user){
     //To be replaced with Daniel & Chris' QueueUser
  },
})

export default firebaseConnect(addListener, addDispatcher)(GameOver)
