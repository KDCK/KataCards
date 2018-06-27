import React, {Component} from 'react'
import {db} from '../../firebase'
import {withRouter, Link} from 'react-router-dom'
import FormDropDown from './Dropdown'
import {randomCardGenerator} from './RandomCardGenerator'
import SingleCard from '../Cards/SingleCard'
import {Button} from 'react-materialize'
import Spinner from '../Loader/Spinner'

import './BuyCard.css'

class BuyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goldSpent: 0,
      gold: 0,
      enoughCurrency: true,
      purchased: false,
      user: undefined,
      purchasedCard: undefined
    }
    this.handleChange = this.handleChange.bind(this)
    this.purchaseCard = this.purchaseCard.bind(this)
    this.backToStore = this.backToStore.bind(this)
  }

  // Set authUser on state
  componentWillReceiveProps(nextProps) {
    const uid = nextProps.authUser.uid
    const userRef = db.ref(`users/${uid}`)
    userRef.once('value', snapshot => {
      let gold = snapshot.val().gold
      this.setState({user: nextProps.authUser, gold: gold})
    })
  }

  async getCards() {
    const cardsRef = db.ref('cards')
    const cardsArr = []

    await cardsRef.once('value', snapshot => {
      snapshot.forEach(child => {
        let childData = child.val()
        cardsArr.push(childData)
      })
    })
    return cardsArr
  }

  // This is essentially "handleSubmit"
  async purchaseCard() {
    const uid = this.props.authUser.uid
    const goldSpent = this.state.goldSpent
    if (this.state.gold < goldSpent) {
      this.setState({enoughCurrency: false})
      return
    } else {
      this.setState({enoughCurrency: true})
    }

    const allCards = await this.getCards()
    const chosenCard = randomCardGenerator(allCards, this.state.goldSpent)

    this.setState(prevState => {
      return {
        purchasedCard: chosenCard,
        purchased: true,
        gold: Number(prevState.gold) - Number(goldSpent)
      }
    })

    const userRef = db.ref(`users/${uid}`)
    userRef.once('value', snapshot => {
      let thisUser = snapshot.val()
      let prevGold = thisUser.gold
      let prevCards = thisUser.cards

      prevGold -= goldSpent
      prevCards = [...prevCards, chosenCard]

      db.ref(`users/${uid}`).update({
        gold: prevGold,
        cards: prevCards
      })
    })
  }

  // Must destructure value because of the way Semantic UI Component (Dropdown.js) handles options
  handleChange(evt, {value}) {
    this.setState({goldSpent: Number(value)})
  }

  backToStore(evt) {
    this.setState({purchased: false})
  }

  render() {
    return !this.state.purchased ? (
      <div className="store-container">
        <h1>Welcome to the Card Store</h1>
        <p>
          Purchasing from a higher Tier increases the likelihood of getting a
          better card, but does not guarantee it!
        </p>
        <h3>You have {this.state.gold} gold</h3>
        <h3>How much do you want to spend?</h3>
        <p>
          Tier 1: 1 Gold<br />Tier 2: 2 Gold<br />Tier 3: 3 Gold
        </p>
        <FormDropDown
          purchaseCard={this.purchaseCard}
          handleChange={this.handleChange}
        />
        {this.state.enoughCurrency ? null : <h1>Not enough gold!</h1>}
      </div>
    ) : (
      <div className="store-container">
        <h1>You bought: {this.state.purchasedCard.name}!</h1>
        <h2>Tier {this.state.purchasedCard.tier}</h2>
        <SingleCard card={this.state.purchasedCard} />
        <h3>You have {this.state.gold} gold left</h3>
        <Button
          onClick={this.backToStore}
          className="back-to-store"
          waves="red"
        >
          Try Again?
        </Button>
      </div>
    )
  }
}

export default withRouter(BuyCard)
