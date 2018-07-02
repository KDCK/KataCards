import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { Button, Modal, Image, Header, Input, Icon, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

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
    this.props.updateCodeWarsName(this.state.codeName)
    this.props.history.push('/home')
  }

  async validate(codeName) {
    console.log(codeName);
    
    const { data } = await axios.get(
      `/api/code/validate/${codeName}`
    )
    console.log(data);
    
    if (data) {
      this.setState({approved: true, warning: false})
    } else {
      this.setState({ approved: false, warning: true })
    }
  }

  render() {
    if (!this.props.current) {
      return <Spinner />
    }
    
    if (this.props.user && !this.props.current.codeName) {
      console.log(this.props, this.state);
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
                  <p>This is not a valid Codewars handle.</p>
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
          game_instance: {},
          gold: 20,
          cards: [
            {
              "id": 1,
              "name": "Vérane",
              "atk": 28,
              "def": 10,
              "tier": 2,
              "global_count": 10,
              "description":
                "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc."
            },
            {
              "id": 7,
              "name": "Dorothée",
              "atk": 73,
              "def": 12,
              "tier": 1,
              "global_count": 9,
              "description":
                "Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."
            },
            {
              "id": 8,
              "name": "Björn",
              "atk": 59,
              "def": 82,
              "tier": 1,
              "global_count": 2,
              "description":
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor."
            },
            {
              "id": 12,
              "name": "Eloïse",
              "atk": 20,
              "def": 37,
              "tier": 1,
              "global_count": 10,
              "description":
                "Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi."
            },
            {
              "id": 16,
              "name": "Andréa",
              "atk": 19,
              "def": 86,
              "tier": 1,
              "global_count": 8,
              "description":
                "Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla."
            }
          ],
          deck: [
            {
              "id": 1,
              "name": "Vérane",
              "atk": 28,
              "def": 10,
              "tier": 2,
              "global_count": 10,
              "description":
                "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc."
            },
            {
              "id": 7,
              "name": "Dorothée",
              "atk": 73,
              "def": 12,
              "tier": 1,
              "global_count": 9,
              "description":
                "Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."
            },
            {
              "id": 8,
              "name": "Björn",
              "atk": 59,
              "def": 82,
              "tier": 1,
              "global_count": 2,
              "description":
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor."
            },
            {
              "id": 12,
              "name": "Eloïse",
              "atk": 20,
              "def": 37,
              "tier": 1,
              "global_count": 10,
              "description":
                "Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi."
            },
            {
              "id": 16,
              "name": "Andréa",
              "atk": 19,
              "def": 86,
              "tier": 1,
              "global_count": 8,
              "description":
                "Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla."
            }
          ],
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
    ref(`/users/${connector.props.uid}/`).update({ online: true })
  },
  checkUser() {
    return connector.props.auth
  },
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(Update))
