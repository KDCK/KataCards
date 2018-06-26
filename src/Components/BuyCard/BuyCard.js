import React, {Component} from 'react'
import FormDropDown from './Dropdown'

import './BuyCard.css'

class BuyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {goldSpent: 0}
    this.handleChange = this.handleChange.bind(this)
  }

  purchaseCard() {}

  handleChange(evt) {
    this.setState({goldSpent: evt.target.value})
    console.log(this.state)
  }

  render() {
    console.log('UserOnState', this.props.authUser)
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
        <FormDropDown />
      </div>
    )
  }
}

export default BuyCard
