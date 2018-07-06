import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { firebaseConnect } from 'fire-connect'

import { withRouter } from 'react-router-dom'
import DropDown from './Dropdown'
import { randomCardGenerator } from './RandomCardGenerator'
import SingleCard from '../Cards/SingleCard'
import { Button } from 'react-materialize'

import './BuyCard.css'

class BuyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goldSpent: 0,
      gold: 0,
      enoughCurrency: true,
      purchased: false,
      purchasedCard: undefined,
      selected: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.purchaseCard = this.purchaseCard.bind(this)
    this.backToStore = this.backToStore.bind(this)
  }

  async purchaseCard() {
    const goldSpent = this.state.goldSpent
    if (this.props.user.gold < goldSpent) {
      this.setState({ enoughCurrency: false })
      return
    } else {
      this.setState({ enoughCurrency: true })
    }

    const allCards = await this.props.getCards()
    const chosenCard = randomCardGenerator(allCards, this.state.goldSpent)

    this.setState(prevState => {
      return {
        purchasedCard: chosenCard,
        purchased: true,
        gold: Number(this.props.user.gold) - Number(goldSpent)
      }
    })
    const cardsLength = this.props.user.cards
      ? Object.keys(this.props.user.cards).length
      : 0

    this.props.updateUserCardAndGold(goldSpent, chosenCard, cardsLength)
  }

  // Must destructure value because of the way Semantic UI Component (Dropdown.js) handles options
  handleChange(evt, { value }) {
    this.setState({ goldSpent: Number(value), selected: true })
  }

  backToStore(evt) {
    this.setState({ purchased: false })
  }

  render() {
    return (
      <div>
        {this.props.user.mute ? null : (
          <ReactPlayer
            style={{ display: 'none' }}
            url="https://www.youtube.com/watch?v=9p70UVWn6P8"
            playing
            loop
          />
        )}
        {!this.state.purchased ? (
          <div>
            <img
              className="store-img"
              alt="home background"
              src="cardstore.gif"
            />
            <div className="store-container">
              <h1>Welcome to the Card Store</h1>
              <h4>
                Purchasing from a higher Tier increases the likelihood of
                getting a better card, but does not guarantee it!
              </h4>
              <h3>You have {this.props.user.gold} gold</h3>
              <h3>How much do you want to spend?</h3>
              <p>
                Tier 1: 1 Gold<br />Tier 2: 2 Gold<br />Tier 3: 3 Gold
              </p>
              <DropDown
                selected={this.state.selected}
                purchaseCard={this.purchaseCard}
                handleChange={this.handleChange}
              />
              {this.state.enoughCurrency ? null : <h1>Not enough gold!</h1>}
            </div>
          </div>
        ) : (
          <div>
            <img
              className="store-img"
              alt="home background"
              src="cardstore.gif"
            />
            <div className="store-bought">
              <h1>You bought: {this.state.purchasedCard.name}!</h1>
              <h2>Tier {this.state.purchasedCard.tier}</h2>
              <SingleCard card={this.state.purchasedCard} />
              <h3>You have {this.props.user.gold} gold left</h3>
              <Button
                onClick={this.backToStore}
                className="back-to-store"
                waves="red"
              >
                Try Again?
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`/users/${connector.props.user.uid}`).on(
      setEventType('value'),
      snapshot => {
        connector.setState({ user: snapshot.val() })
      }
    )
})

const addDispatcher = (connector, ref, user) => ({
  async getCards() {
    const cardsArr = []
    await ref('/cards').once('value', snapshot => {
      snapshot.forEach(child => {
        let childData = child.val()
        cardsArr.push(childData)
      })
    })
    return cardsArr
  },
  async updateUserCardAndGold(goldSpent, chosenCard, cardsLength) {
    await ref(`users/${user.uid}`).once('value', snapshot => {
      const thisUser = snapshot.val()

      let prevGold = thisUser.gold
      prevGold -= goldSpent
      ref(`users/${user.uid}`).update({
        gold: prevGold
      })
      const cardsRef = ref(`users/${user.uid}/cards`)
      cardsRef.child(cardsLength).set({ ...chosenCard, id: cardsLength })
    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(BuyCard))
