import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { auth } from '../firebase'
import { Menu, Dropdown } from "semantic-ui-react"
import { withRouter } from 'react-router-dom'
import UpdateGold from './Users/UpdateGold'

import './Nav.css'

class Nav extends Component {
  render() {
    console.log("props", this.props)
    if (!this.props.user && !this.props.currentPlayer) return (<Menu fixed="top" inverted color="teal" />)
    if (this.props.user) {
      return (
        <Menu fixed="top" inverted color="teal" size="tiny">
          <Menu.Item icon="home" name="Kata Cards" position="left" onClick={() => this.props.redirectToHome(this.props.history)}>
          </Menu.Item>
          <Menu.Item position="right">
            <UpdateGold authUser={this.props.authUser} />
          </Menu.Item>
          <Dropdown item icon="bars" position="right" pointing="top right">
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.props.redirectToBuyCards(this.props.history)}>Buy Cards</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.redirectToProfile(this.props.history)}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.redirectToCredits(this.props.history)}>Credits</Dropdown.Item>
              <Dropdown.Item onClick={() => this.props.setOffline(this.props.user.uid, this.props.history)}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>)
    }
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`users/${user.uid}`).on(setEventType('value'), snapshot => {
      connector.setState({ currentPlayer: snapshot.val() })
    })
})

const addDispatcher = (connector, ref, user) => ({
  setOffline(uid, history) {
    const offline = false
    ref(`users/${uid}`).update({ online: offline })
    auth.signOut()
    history.push('/home')
  },
  redirectToHome(history) {
    history.push('/home')
  },
  redirectToProfile(history) {
    history.push('/profile')
  },
  redirectToBuyCards(history) {
    history.push('/cardstore')
  },
  redirectToCredits(history) {
    history.push('/credits')
  }
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(Nav))
