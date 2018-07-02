import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import _ from "lodash"
import { auth } from '../firebase'
import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react"
import { NavLink, withRouter } from 'react-router-dom'
import UpdateGold from './Users/UpdateGold'

import './Nav.css'


// class Nav extends Component {
//   render() {
//     if (this.props.user) {
//       const uid = this.props.user.uid
//       return (
//         <Navbar brand="Kata Cards" right>
//           <div className="nav-bar">
//             <li>
//               <NavLink to="/profile">{this.props.user.email}</NavLink>
//             </li>
//             <li className="update-gold">
//               <UpdateGold authUser={this.props.authUser} />
//             </li>
//             <li>
//               <NavLink to="/cardstore">Buy Cards</NavLink>
//             </li>
//             <li>
//               <NavLink to="/home">Home</NavLink>
//             </li>
//             <li>
//               <NavLink to="/logout" onClick={() => this.props.setOffline(uid)}>Logout</NavLink>
//             </li>
//             <li>
//               <NavLink to="/profile">Profile</NavLink>
//             </li>
//           </div>
//           {/* <Icon>search</Icon> */}
//         </Navbar>
//       )
//     }
//     return (
//       <Navbar brand="Kata Cards" right>
//         <div className="nav-bar">
//           <li>
//             <NavLink to="/signup">Signup</NavLink>
//           </li>
//           <li>
//             <NavLink to="/login">Login</NavLink>
//           </li>
//         </div>
//         {/* <Icon>search</Icon> */}
//       </Navbar>
//     )
//   }
// }

class Nav extends Component {
  render() {
    if (!this.props.user && !this.props.currentPlayer) return (<Menu fixed="top" inverted color="red" />)
    if (this.props.user) {
      return (
      <Menu fixed="top" inverted color="red">
        <Menu.Item>
          <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>
        <Menu.Item position="right"><Icon name="align justify"/></Menu.Item>
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
  setOffline(uid) {
    const offline = false
    ref(`users/${uid}`).update({ online: offline })
    auth.signOut()
    this.props.history.push('/home')
  }
})

export default firebaseConnect(addListener, addDispatcher)(withRouter(Nav))
