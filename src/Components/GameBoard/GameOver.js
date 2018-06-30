import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'
import { firebaseConnect } from 'fire-connect'


import './gameover.css'

const GameOver = () => {
  const { winner } = {}//this.props.gameStats
  const { playerOneTotal} = {}//this.props.gameStats
  const { playerTwoTotal} = {}//this.props.gameStats

  return(
    <div>
      <div className="gameover-card">
        <h1>{winner} Wins!</h1>
        <div className="gameover-buttons">
          <Button onClick={()=>alert('JOINBATTLE')}>Join Battle</Button>
          <Link to="/home"><Button>Home</Button></Link>
        </div>
      </div>
      <img src='/gameover.gif'/>
    </div>
  )
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () => ref(`/users/${connector.props.user.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({ user: snapshot.val() })
  })
})

const addDispatcher = (connector, ref) =>({
   queueUser(user){
     //To be replaced with Daniel & Chris' QueueUser
  },
})

export default firebaseConnect(null, addDispatcher)(GameOver)
