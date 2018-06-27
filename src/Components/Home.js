import React, {Component} from 'react'
import firebase, {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'
import './Home.css'

class Home extends Component {

  componentDidUpdate() {
    if(this.props.authUser){
      const uid = this.props.authUser.uid
      const email = this.props.authUser.email
      const user =  firebase.database().ref('/users/' + uid)
      user.once('value', (snapshot) => {
        let thisUser = snapshot.val()
        if(!thisUser){
          //USER MODEL
          db.ref(`users/${uid}`).set({
            email,
            name: this.props.authUser.displayName,
            //codewars_name: CODEWARSOBJ.username,
            prevChallenges: 100, //CODEWARSOBJ.codeChallenges.totalCompleted,
            nextChallenges: 100, //CODEWARSOBJ.codeChallenges.totalCompleted
            online: true,
            in_battle: false,
            cards:[],
            gold: 20,
          })
        }
      })
    }
  }

  render() {
    console.log(this.props);
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
