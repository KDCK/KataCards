import React, {Component} from 'react'
import {firebaseConnect} from 'fire-connect'
import {Button, Modal} from 'semantic-ui-react'
import { Row, Input } from 'react-materialize'
import Spinner from './Loader/Spinner'

class Update extends Component {
  constructor(props) {
    super(props)

    this.state = {
      code_wars_name: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log(`HERE'S THE EVENT INSIDE THE FORM: `, event)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.props.updateCodeWarsName(this.state.code_wars_name)
    this.props.history.push('/home')
  }

  render() {
    if (!this.props.user) {
        return <Spinner />
      } else {
          this.props.newUserDefault()
          return (
            <div>
              <Spinner />
              <Modal open={!this.props.user.code_wars_name}>
                <h4>Give us your CodeWars user name to get gold for your completed code challenges</h4>
                {/* <form handleSubmit={this.handleSubmit}>
                  <input name='code_wars_name' value={this.state.code_wars_name} placeholder='CodeWars User Name' s={8} onChange={this.handleChange} />
                  <Button waves='light' className='button' onClick={this.handleSubmit}>Submit CodeWars User Name</Button>
                </form> */}
                <form onSubmit={this.handleSubmit}>
                  <input placeholder='CodeWars User Name' type="text" name="code_wars_name"
                  onChange={this.handleChange}
                  />
                </form>
              </Modal>
            </div>
          )
      }
    }
}

const addDispatcher = (connector, ref, user) => ({
  newUserDefault() {
    console.log(connector)
    ref(`/users/${connector.props.auth.O}`).once('value', snapshot => {
      if (!snapshot.val()) {
        ref(`/users/${connector.props.auth.O}`).set({
          email: connector.props.user.email,
          code_wars_name: null,
          challenges: 0,
          online: true,
          in_battle: false,
          game_instance: {},
          gold: 20,
          cards: [
            {
              atk: 28,
              def: 10,
              description: "I'm a card",
              global_count: 1,
              id: 55,
              name: 'JOE',
              tier: 2
            }
          ],
        })
      }
    })
  },
  updateCodeWarsName(codeWarsName) {
    ref(`/users/${connector.props.auth.O}`).update({
      code_wars_name: codeWarsName
    })
  }
})

export default firebaseConnect(null, addDispatcher)(Update)
