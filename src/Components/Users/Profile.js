import React, { Component } from 'react'
import UserCard from './UserCard'
import Spinner from '../Loader/Spinner.js'
import SingleCard from '../Cards/SingleCard.js'
import firebase from '../../firebase.js'


class Profile extends Component{
  constructor(){
    super()
    this.state ={
      user:{}
    }
  }

  componentDidMount(){
    const userInfo = firebase.database().ref('/users/' + 9)
    userInfo.on('value', (snapshot) => {
      let user = snapshot.val()
      console.log(user)
      this.setState({
        user
      })
    })

    console.log('User Mounted')

  }

  render(){
    const cards = this.state.user.cards

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
