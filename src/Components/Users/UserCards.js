import React, { Component } from 'react'
import Card from 'react-materialize'
//import firebase from 'firebase'


class UserCards extends Component{
  constructor(){
    super()
  }

  componentDidMount(){
    console.log('User Cards Mounted')
  }

  render(){
    return (
      <div>
        {this.props.cards.map( card => {
          return(
            <Card
            className='small'
            header={<CardTitle image='../../../public/skeleton_warrior.png'>{card.name}</CardTitle>}
            actions={[<a href='/cards/{card.id}'>This is a Link</a>]}>
            {card.description}
            </Card>
          )
        })}
      </div>
    )
  }
}

export default UserCards
