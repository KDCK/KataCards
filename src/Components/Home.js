import React, {Component} from 'react'
import firebase, {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'
import './Home.css'

class Home extends Component {
  constructor(props){
    super(props)
  }

  componentDidUpdate(prevProps) {
    const uid = this.props.authUser.uid
    const email = this.props.authUser.email
    db.ref(`users/${uid}`).set({email})
  }

  render() {
    return (
      <div>
        <div className="home-container">
          <h5>WELCOME TO KATA CARDS</h5>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
