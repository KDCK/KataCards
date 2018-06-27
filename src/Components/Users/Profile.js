import React, {Component} from 'react'
import UserCard from './UserCard'
import Spinner from '../Loader/Spinner.js'
import SingleCard from '../Cards/SingleCard.js'
import firebase from '../../firebase.js'
import './profile.css'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.authUser || {},
      cards: [
        {
          id: 1,
          name: 'Vérane',
          atk: 28,
          def: 10,
          tier: 2,
          global_count: 10,
          description:
            'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
        }
      ]
    }
    console.log('constructing with user', this.state.user.uid)
  }

  componentDidMount() {
    console.log('component mounted with user', this.state.user.uid)
    if (this.state.user.uid) this.subscribeToUid(this.state.user.uid)
  }

  unsubscribeCurrentRef() {
    console.log('checking to see if we should unsubscribe', this.state.user.uid)
    if (this.userRef && this.previousListener) {
      console.log('unsubscribing current user ref', this.state.user.uid)
      this.userRef.off('value', this.previousListener)
      this.userRef = null
      this.previousListener = null
    }
  }

  subscribeToUid(uid) {
    console.log('subscribing to user uid', uid)
    this.unsubscribeCurrentRef()
    this.userRef = firebase.database().ref('/users/' + uid)
    const listener = snapshot => {
      const user = snapshot.val()
      console.log('new value', user)
      this.setState({
        user
      })
    }
    // setTimeout(() => {
    this.userRef.on('value', listener)
    // }, 0)
    this.previousListener = listener
  }

  //currently only loads user on page refresh -- need to fix this bug
  componentWillReceiveProps(nextProps) {
    if (!nextProps.authUser || nextProps.authUser.uid === this.state.user.uid)
      return
    console.log('receiving new uid', nextProps.authUser.uid)
    this.subscribeToUid(nextProps.authUser.uid)
  }

  componentWillUnmount() {
    console.log('unsubscribing')
    this.unsubscribeCurrentRef()
  }

  render() {
    const cards = this.state.cards
    return (
      <div className="profile">
        <UserCard user={this.state.user} />
        {!cards ? (
          <Spinner />
        ) : (
          cards.map(card => <SingleCard key={card.id} card={card} />)
        )}
      </div>
    )
  }
}

export default Profile
