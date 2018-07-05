import React, {Component} from 'react'
import {Button, Label} from 'semantic-ui-react'
import axios from 'axios'
import {firebaseConnect} from 'fire-connect'

class UpdateGold extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    let codeWarsObject = await axios.get(
      `https://kcserver.herokuapp.com/api/code/${this.props.user.codeName}`
    )
    let newChallengesNumber = codeWarsObject.data.codeChallenges.totalCompleted
    let prevGold = this.props.user.gold
    prevGold += newChallengesNumber - this.props.user.challenges
    this.props.updateGold(prevGold, newChallengesNumber)
  }

  render() {
    if (!this.props.user) {
      return <Button loading>Loading</Button>
    }
    return (
        <Button as="div" labelPosition="right" onClick={this.handleClick}>
          <Button color="violet">Collect your Codewars Gold!</Button>
          <Label basic pointing="left">
            {this.props.user.gold}
          </Label>
        </Button>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`users/${user.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({user: snapshot.val()})
    })
})

const addDispatcher = (connector, ref, user) => ({
  updateGold(newGold, newChallenges) {
    ref(`users/${user.uid}`).update({
      gold: newGold,
      challenges: newChallenges
    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(UpdateGold)
