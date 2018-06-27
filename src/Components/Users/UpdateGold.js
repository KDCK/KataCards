import React, {Component} from 'react'
import firebase, {db} from '../../firebase'
import {Button, Label, Icon} from 'semantic-ui-react'
import axios from 'axios'

class UpdateGold extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gold: 0
    }

    this.handleClick = this.handleClick.bind(this)
  }

  async handleClick() {
    const uid = this.props.authUser.uid
    const user = firebase.database().ref('/users/' + uid)
    let codeWarsObject = await axios.get('/api/code/rando')
    console.log(`CODEWARS OBJECT: `, codeWarsObject)
    let newChallengesNumber = codeWarsObject.data.codeChallenges.totalCompleted
    user.once('value', snapshot => {
      let thisUser = snapshot.val()
      console.log(thisUser)
      let prevGold = thisUser.gold
      console.log(prevGold)
      prevGold += newChallengesNumber - thisUser.challenges
      console.log(prevGold)
      db.ref(`users/${uid}`).update({
        gold: prevGold,
        prevChallenges: newChallengesNumber,
        nextChallenges: newChallengesNumber
      })
    })
  }

  render() {
    if (!this.props.authUser) {
      return <Button loading>Loading</Button>
    } else {
      const uid = this.props.authUser.uid
      const user = firebase.database().ref('/users/' + uid)
      // user.once('value', (snapshot) => {
      //   let thisUser = snapshot.val()
      //   this.setState({gold: thisUser.gold})
      // })
      if (this.state.gold > 0) {
        return (
          <div onClick={this.handleClick}>
            <Button as="div" labelPosition="right">
              <Button icon>Update Gold</Button>
              <Label as="a" basic pointing="left">
                {this.state.gold}
              </Label>
            </Button>
          </div>
        )
      } else {
        return <Button loading>Loading</Button>
      }
    }
  }
}

export default UpdateGold
