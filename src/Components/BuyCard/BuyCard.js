import React, {Component} from 'react'
import FormDropDown from './Dropdown'
import {auth, db} from '../../firebase'
import {withRouter} from 'react-router-dom'

import './BuyCard.css'

class BuyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {goldSpent: 0, user: undefined}
    this.handleChange = this.handleChange.bind(this)
    this.purchaseCard = this.purchaseCard.bind(this)
  }

  // Set authUser on state
  componentWillReceiveProps(nextProps) {
    console.log('USER', nextProps.authUser)
    this.setState({user: nextProps.authUser})
  }

  async getCards() {
    const cardsRef = db.ref('cards')
    const cardsArr = []

    await cardsRef.once('value', snapshot => {
      snapshot.forEach(child => {
        // let childKey = child.key
        let childData = child.val()
        cardsArr.push(childData)
      })
    })
    return cardsArr
  }

  async randomCardGenerator() {
    const allCards = await this.getCards()

    const tier1 = allCards.filter(card => card.tier === 1)
    const tier2 = allCards.filter(card => card.tier === 2)
    const tier3 = allCards.filter(card => card.tier === 3)

    const purchaseArr = []
    let chosenCard = {}

    if (this.state.goldSpent === 1) {
      for (let i = 0; i < 7; i++) {
        purchaseArr.push(tier1[Math.floor(Math.random() * tier1.length)])
      }
      for (let i = 0; i < 2; i++) {
        purchaseArr.push(tier2[Math.floor(Math.random() * tier2.length)])
      }
      for (let i = 0; i < 1; i++) {
        purchaseArr.push(tier3[Math.floor(Math.random() * tier3.length)])
      }
    }
    if (this.state.goldSpent === 2) {
      for (let i = 0; i < 3; i++) {
        purchaseArr.push(tier1[Math.floor(Math.random() * tier1.length)])
      }
      for (let i = 0; i < 5; i++) {
        purchaseArr.push(tier2[Math.floor(Math.random() * tier2.length)])
      }
      for (let i = 0; i < 2; i++) {
        purchaseArr.push(tier3[Math.floor(Math.random() * tier3.length)])
      }
    }
    if (this.state.goldSpent === 3) {
      for (let i = 0; i < 2; i++) {
        purchaseArr.push(tier1[Math.floor(Math.random() * tier1.length)])
      }
      for (let i = 0; i < 5; i++) {
        purchaseArr.push(tier2[Math.floor(Math.random() * tier2.length)])
      }
      for (let i = 0; i < 3; i++) {
        purchaseArr.push(tier3[Math.floor(Math.random() * tier3.length)])
      }
    }

    chosenCard = purchaseArr[Math.floor(Math.random() * purchaseArr.length)]
    // console.log('chosenCard', chosenCard)
    return chosenCard
  }

  // This is essentially "handleSubmit"
  purchaseCard(evt) {
    // evt.preventDefault()
    console.log(`YOU CLICKED ME and spent: ${this.state.goldSpent} gold`)
    // const userRef = db.ref(`users/${this.state.user.uid}`)
    // userRef.set({cards: [...cards, chosenCard]})
    // console.log(userRef)
    this.randomCardGenerator()
  }

  // Must destructure value because of the way Semantic UI Component (Dropdown.js) handles options
  handleChange(evt, {value}) {
    this.setState({goldSpent: Number(value)})
  }
  const

  render() {
    // console.log('UserOnState', this.props.authUser.uid)
    // console.log(userRef)
    return (
      <div className="store-container">
        <h1>Welcome to the Card Store</h1>
        <p>
          Purchasing from a higher Tier increases the likelihood of getting a
          better card, but does not guarantee it!
        </p>
        <h3>How much do you want to spend?</h3>
        <p>
          Tier 1: 1 Gold<br />Tier 2: 2 Gold<br />Tier 3: 3 Gold
        </p>
        <FormDropDown
          purchaseCard={this.purchaseCard}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default withRouter(BuyCard)
