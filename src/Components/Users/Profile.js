import React, { Component } from 'react'
import UserCard from './UserCard'
import Spinner from '../Loader/Spinner.js'
import SingleCard from '../Cards/SingleCard.js'
import firebase from '../../firebase.js'
import './profile.css'

class Profile extends Component{
  constructor(){
    super()
    this.state = {
      user: {},
      cards: [{
        "id": 1,
        "name": "Vérane",
        "atk": 28,
        "def": 10,
        "tier": 2,
        "global_count": 10,
        "description":
          "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc."
      }]
    }
  }

  //currently only loads user on page refresh -- need to fix this bug
  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    const userInfo =  firebase.database().ref('/users/' + nextProps.authUser.uid)
    userInfo.once('value', (snapshot) => {
      let user = snapshot.val()
        this.setState({
          user
        })
      }
    )
  }

  render(){
    const cards = this.state.cards
    return(
      <div className="profile">
        <UserCard user={this.state.user}/>
        {!cards ? <Spinner /> :
          cards.map(card=><SingleCard key={card.id} card={card} />)
        }
      </div>
    )
  }
}

export default Profile;
