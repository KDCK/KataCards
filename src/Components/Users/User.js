import React, { Component } from 'react'
import firebase from '../../firebase.js'

class User extends Component{
  constructor(){
    super()
    this.state ={
      user:{}
    }
  }

  componentDidMount(){
    const userInfo = firebase.database().ref('/users/' + 1)
    userInfo.on('value', (data) => {
      let user = data.val()
      this.setState({
        user
      })
    })

    console.log('User Mounted')
  }

  render(){
    const user = this.state.user
    return(
      <div>
        {user.name}
          <div>
            I_WILL_BE_CARDS
          </div>
      </div>
    )
  }
}

export default User;
