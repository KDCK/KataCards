import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { Button, Modal, Image, Header, Input, Icon, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { starterDeck } from './Data/Data'
import Spinner from './Loader/Spinner'
import './update.css'

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      codeName: '',
      approved: false,
      warning: false
    }

    this.validate = this.validate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.checkUser().onAuthStateChanged(user => {
      if (user && this.props.match.url === '/update') {
        this.props.checkCodeWars()
      }
    })
  }

  componentDidUpdate() {
    if (this.props.user) {
      this.props.newUserDefault()
    }
    this.props.changeStatus()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit() {
    const cardsArray = starterDeck(Object.values(this.props.cards))
    this.props.updateCodeWarsName(this.state.codeName)
    cardsArray.forEach(card => this.props.userCards(card))

    this.props.history.push('/home')
  }

  async validate(codeName) {
    const { data } = await axios.get(
      `https://kcserver.herokuapp.com/api/code/validate/${codeName}`
    )

    if (data) {
      this.setState({ approved: true, warning: false })
    } else {
      this.setState({ approved: false, warning: true })
    }
  }

  render() {
    if (!this.props.current) {
      return <Spinner />
    }

    if (this.props.user && !this.props.current.codeName) {
      return (
        <div>
          <Spinner />
          <Modal open={true}>
            <Modal.Header>Enter Your Codewars Handle</Modal.Header>
            <Modal.Content image>
              <Image wrapped size='big' src='https://orig00.deviantart.net/83ee/f/2016/175/6/3/marketplace_by_kirokaze-da7gj37.gif' />
              <Modal.Description className="modal-desc">
                <Header as="h4">Completing Katas on Codewars will grant you gold</Header>
                <Icon loading size='big' name='sun' />
                <Input
                  error={this.state.warning}
                  name="codeName"
                  placeholder='Codewars Handle'
                  onChange={this.handleChange}
                />
                <Message negative hidden={!this.state.warning}>
                  <Message.Header>Try again</Message.Header>
                  <p>This is not a valid Codewars handle!</p>
                </Message>
                <Message positive hidden={!this.state.approved}>
                  <Message.Header>Valid</Message.Header>
                  <p>This is a valid Codewars handle!</p>
                </Message>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => this.validate(this.state.codeName)} color="facebook">
                Validate
              </Button>
              <Button
                onClick={this.handleSubmit}
                positive
                content='Proceed'
                disabled={!this.state.approved}
              />
            </Modal.Actions>
          </Modal>
        </div>
      )
    }
    return <Spinner />
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`/users/${connector.props.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({ current: snapshot.val() })
    }),
  listenCards: () =>
    ref(`cards`).on('value', snapshot => {
      connector.setState({ cards: snapshot.val() })
    })
})

const addDispatcher = (connector, ref, user) => ({
  newUserDefault() {
    ref(`/users/${connector.props.uid}`).once('value', snapshot => {
      if (!snapshot.exists()) {
        ref(`/users/${connector.props.uid}`).set({
          email: connector.props.user.email,
          codeName: null,
          challenges: 0,
          online: true,
          in_battle: false,
          total_wins: 0,
          game_instance: {},
          gold: 20,
          cards: false,//to be replaced with random starting collection function
          deck: false,
        })
      }
    })
  },
  updateCodeWarsName(codeWarsName) {
    ref(`/users/${connector.props.uid}`).update({
      codeName: codeWarsName
    })
  },
  checkCodeWars() {
    ref(`/users/${connector.props.uid}/codeName`).once('value', snapshot => {
      if (snapshot.exists()) {
        connector.props.history.push('/home')
      }
    })
  },
  changeStatus() {
    ref(`/users/${connector.props.uid}`).update({ online: true })
  },
  checkUser() {
    return connector.props.auth
  },
  userCards(card) {
    ref(`/users/${connector.props.uid}/cards/${card.id}`).set({ ...card })
  }
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(Update))
