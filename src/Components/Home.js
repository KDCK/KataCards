import React, {Component} from 'react'
import firebase, {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'
import './Home.css'

class Home extends Component {
  // constructor(){
  //   super()
  //   this.state={
  //     user:[]
  //   }
  // }

  // shouldComponentUpdate(prevProps, prevState){
  //   if(this.state.user.email === prevProps.authUser.email) return false
  // }
  componentWillReceiveProps(nextprops) {
    if (this.props.authUser && (this.props.authUser.email !== nextprops.authUser.email)){
      if(this.props.authUser){
        const uid = this.props.authUser.uid
        const email = this.props.authUser.email
        const user =  firebase.database().ref('/users/' + uid)
        user.once('value', (snapshot) => {
          let thisUser = snapshot.val()
          console.log(`THIS USER FROM DID Update`, thisUser)
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

            // this.setState({user:thisUser})

          }else{

            let userRef = thisUser
            let prevGold = userRef.gold;//100
            db.ref(`users/${uid}`).update({
              nextChallenges: 120 //CODEWARSOBJ
            })
            let gold = prevGold += (userRef.nextChallenges - userRef.prevChallenges)
            db.ref(`users/${uid}`).update({
              gold,
              prevChallenges: userRef.nextChallenges,
            })
            // this.setState({user:thisUser})
          }
        })
      }
    }
  }

  // componentDidUpdate(prevProps) {
  //   console.log('CDU',this.props.authUser);
  //   if(this.props.authUser){
  //     const uid = this.props.authUser.uid
  //     const email = this.props.authUser.email
  //     const user =  firebase.database().ref('/users/' + uid)
  //     user.once('value', (snapshot) => {
  //       let thisUser = snapshot.val()
  //       console.log(`THIS USER FROM DID Update`, thisUser)
  //       if(!thisUser){
  //         //USER MODEL
  //         db.ref(`users/${uid}`).set({
  //           email,
  //           name: this.props.authUser.displayName,
  //           //codewars_name: CODEWARSOBJ.username,
  //           prevChallenges: 100, //CODEWARSOBJ.codeChallenges.totalCompleted,
  //           nextChallenges: 100, //CODEWARSOBJ.codeChallenges.totalCompleted
  //           online: true,
  //           in_battle: false,
  //           cards:[],
  //           gold: 20,
  //         })
  //
  //         this.setState({user:thisUser})
  //
  //       }else{
  //
  //         let userRef = thisUser
  //         let prevGold = userRef.gold;//100
  //         db.ref(`users/${uid}`).update({
  //           nextChallenges: 120 //CODEWARSOBJ
  //         })
  //         let gold = prevGold += (userRef.nextChallenges - userRef.prevChallenges)
  //         db.ref(`users/${uid}`).update({
  //           gold,
  //           prevChallenges: userRef.nextChallenges,
  //         })
  //         this.setState({user:thisUser})
  //       }
  //     })
  //   }
  // }

  // async componentWillUnmount(){
  //   const uid = this.props.authUser.uid
  //   const user =  firebase.database().ref('/users/' + uid)
  //   user.off()
  // }

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
