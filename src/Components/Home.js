import React, {Component} from 'react'
import { firebaseConnect } from 'fire-connect'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {

  handleClick(user){
    this.props.queueUser(user)
  }

  render() {
    return (
      <div>
        <img className="home-img" alt="home background"
          src="home.png" />
        <div className="home-buttons">
          <div className="home-buttons-top">
            <Button large className="home-button" waves="purple" onClick={() =>this.handleClick(this.props.user)}>Join Battle</Button>
          </div>
          <div className="home-buttons-bottom">
            <Link to="/userdeck"><Button className="home-button" waves="purple">My Deck</Button></Link>
            <Link to="/profile"><Button className="home-button" waves="purple">My Profile</Button></Link>
          </div>
        </div>
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () => ref(`/users/${connector.props.user.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({ user: snapshot.val() })
  })
})

const addDispatcher = (connector, ref) =>({
   queueUser(user){
    if(!user.in_battle){
      ref(`/queue/${connector.props.user.uid}`).push(user.uid)
      ref(`/users/${connector.props.user.uid}`).update({
        in_battle: "waiting"
      })
    }
  },
})

export default firebaseConnect(addListener, addDispatcher)(Home)
