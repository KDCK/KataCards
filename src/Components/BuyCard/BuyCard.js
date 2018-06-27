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
    this.randomCardGenerator = this.randomCardGenerator.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log('USER', nextProps.authUser)
    this.setState({user: nextProps.authUser})
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

  async randomCardGenerator() {
    const cardsRef = db.ref('cards')
    const cardsArr = []

    await cardsRef.once('value', snapshot => {
      snapshot.forEach(child => {
        let childKey = child.key
        let childData = child.val()
        cardsArr.push(childData)
      })
    })
    console.log(cardsArr)
  }

  // Must destructure value because of the way Semantic UI Component (Dropdown.js) handles options
  handleChange(evt, {value}) {
    this.setState({goldSpent: value})
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
