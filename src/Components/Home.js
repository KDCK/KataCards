import React, {Component} from 'react'
import firebase, {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {
  componentDidUpdate() {
    if (this.props.authUser) {
      const uid = this.props.authUser.uid
      const user = firebase.database().ref('/users/' + uid)
      user.once('value', snapshot => {
        let thisUser = snapshot.val()
        console.log('You got a user here: ', thisUser)
      })
    }
  }

  render() {
    return (
      <div>
        <img className="home-img" alt="home background"
          src="home.png" />
        <div className="home-buttons">
          <div className="home-buttons-top">
            <Link to="/battle"><Button large className="home-button" waves="purple">Join Battle</Button></Link>
          </div>
          <div className="home-buttons-bottom">
            <Link to="/cards"><Button className="home-button" waves="purple">Cards</Button></Link>
            <Link to="/profile"><Button className="home-button" waves="purple">Profile</Button></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
