import React, {Component} from 'react'
import { firebaseConnect } from 'fire-connect'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {

  render() {
    console.log("Home: ", this.props.user)
    return (
      <div>
        <img className="home-img" alt="home background"
          src="home.png" />
        <div className="home-buttons">
          <div className="home-buttons-top">
            <Link to="/battle"><Button large className="home-button" waves="purple">Join Battle</Button></Link>
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

export default firebaseConnect(addListener)(Home)
