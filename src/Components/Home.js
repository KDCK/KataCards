import React, {Component} from 'react'
import firebase, {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'
import './Home.css'

class Home extends Component {
  componentDidUpdate() {
    if (this.props.authUser) {
      const uid = this.props.authUser.uid
      const email = this.props.authUser.email
      const user = firebase.database().ref('/users/' + uid)
      user.once('value', snapshot => {
        let thisUser = snapshot.val()
        if (!thisUser) {
          //USER MODEL
          db.ref(`users/${uid}`).set({
            email,
            name: this.props.authUser.displayName,
            //codewars_name: CODEWARSOBJ.username,
            challenges: 0, //CODEWARSOBJ.codeChallenges.totalCompleted,
            online: true,
            in_battle: false,
            cards: [
              {
                atk: 28,
                def: 10,
                description: "I'm a card",
                global_count: 1,
                id: 55,
                name: 'JOE',
                tier: 2
              }
            ],
            gold: 20
          })
        }
      })
    }
  }

  render() {
    console.log(this.props)
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
