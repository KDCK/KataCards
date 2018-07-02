import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { Button, Modal } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import Spinner from './Loader/Spinner'

class Update extends Component {
  constructor(props) {
    super(props)

    this.state = {
      codeName: ''
    }

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

  render() {
    if (!this.props.current) {
      console.log(this.props);

      return <Spinner />
    }
    if (this.props.user && !this.props.current.codeName) {
      return (
        <div>
          <Spinner />
          <Modal open={!this.props.user.codeName}>
            <h4>Give us your CodeWars user name to get gold for your completed code challenges</h4>
            <form onSubmit={this.handleSubmit}>
              <input placeholder='CodeWars User Name' type="text" name="codeName"
                onChange={this.handleChange}
              />
            </form>
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
      if(snapshot.exists()) {
        connector.props.history.push('/home')
      }
    })
  },
  changeStatus() {
    ref(`/users/${connector.props.uid}/`).update({online: true})
  },
  checkUser() {
    return connector.props.auth
  },
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(Update))
