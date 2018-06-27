import React, { Component } from 'react'
import firebase from '../../firebase.js'
import SingleCard from '../Cards/SingleCard.js'


class Trade extends Component{
  constructor(){
    super()
    this.state ={
      userCards:[],
      traderCards:[]
    }
  }

  handleTrade(){

  }

  componentDidMount(){
    // const userInfo = firebase.database().ref('/users/' + 1)
    // userInfo.on('value', (snapshot) => {
    //   let user = snapshot.val()
    //   let userCards =  user.cards
    //   this.setState({
    //     userCards
    //   })
    //   console.log("User Cards: ", userCards)
    // })

    // const traderInfo = firebase.database().ref('/users/' + 2)
    // traderInfo.on('value', (snapshot) => {
    //   let trader = snapshot.val()
    //   let traderCards =  trader.cards
    //   this.setState({
    //     traderCards
    //   })
    //   console.log("Trader Cards: ", traderCards)
    // })

    // console.log('Buy Mounted')

  }

  render(){
    return(
      <div>
        I_WILL_TRADE_CARDS
      </div>
    )
  }
}

export default Trade;
