import React, { Component } from 'react'
import firebase from 'firebase'
import UserCards from './UserCards'

const db = firebase.database();

const dummyUser = {
  id: 2,
  name: "Rhodie Foulsham",
  handle: "Rhodie",
  codewars_name: "eu",
  cards: [
    {
      id: 2,
      name: "Bérengère",
      atk: 47,
      def: 14,
      tier: 2,
      description:
        "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."
    },
    {
      id: 2,
      name: "Bérengère",
      atk: 47,
      def: 14,
      tier: 2,
      description:
        "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."
    },
    {
      id: 2,
      name: "Bérengère",
      atk: 47,
      def: 14,
      tier: 2,
      description:
        "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."
    }],
  "game_history": [{}, {}, {}, {}, {}],
  "gold": 9265
}

//const user = db.ref('users/' + this.state.user.Id)

class User extends Component{
  constructor(){
    super()
  }

  componentDidMount(){
    console.log('User Mounted')
  }

  render(){
    return(
      <div>
        {dummyUser.name}
        <div>
          <UserCards cards={dummyUser.cards}/>
        </div>
      </div>
    )
  }
}
