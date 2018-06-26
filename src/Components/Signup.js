import React, {Component} from 'react'
import firebase, {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'
import {Row, Input, Button} from 'react-materialize'
import './Login.css'

const googleProvider = new firebase.auth.GoogleAuthProvider()

class Signin extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      user: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleGoogle = this.handleGoogle.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(authUser => {
      db.ref(`users/${authUser.user.uid}`).set({email: this.state.email, gold: 20})
    })
    .then(authUser => {
      this.setState(() => ({
        email: '',
        password: ''
      }))
      this.props.history.push('/home')
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleGoogle() {
    firebase.auth().signInWithRedirect(googleProvider)
    .then((result) => {
      const token = result.credential.accessToken
      const user = result.user
    })
      .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential
    })
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className='login-outer-container' >
        <Row handleSubmit={this.handleSubmit}>
          <Input name='email' type='email' label='Email' s={6} onChange={this.handleChange} />
          <Input name='password' type='password' label='Password' s={6} onChange={this.handleChange} />
          <Button waves='light' className='button' onClick={this.handleSubmit}>Sign Up</Button>
          <Button waves='light' className='button' onClick={this.handleGoogle}>Sign Up With Google</Button>
        </Row>
      </div>
    )
  }
}

export default withRouter(Signin)
