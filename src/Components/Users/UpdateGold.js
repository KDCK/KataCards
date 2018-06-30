import React, {Component} from 'react'
import firebase, {db} from '../../firebase'
import {Button, Label, Icon} from 'semantic-ui-react'
import axios from 'axios'
import {firebaseConnect} from 'fire-connect'

class UpdateGold extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    let codeWarsObject = await axios.get(
      `/api/code/${this.props.user.codeName}`
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
      <div onClick={this.handleClick}>
        <Button as="div" labelPosition="right">
          <Button color="violet">Collect your CodeWars Gold!</Button>
          <Label as="a" basic pointing="left">
            {this.props.user.gold}
          </Label>
        </Button>
      </div>
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
