import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Input, Button } from 'react-materialize'
import { firebaseConnect } from 'fire-connect'

import Spinner from '../Components/Loader/Spinner'
import firebase, { auth, db } from '../firebase'
import './Login.css'

const googleProvider = new firebase.auth.GoogleAuthProvider()

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleGoogle = this.handleGoogle.bind(this)
  }

  componentDidMount() {
    this.props.checkUser().onAuthStateChanged(user => {
      if (user && this.props.match.url === '/login') {
        this.props.history.push('/home')
      }
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
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
      }).catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.email
        const credential = error.credential
      })
  }

  render() {
    if (this.props.user) {
      return (<Spinner />)
    }
    return (
      <div className='login-outer-container' >
        <Row handleSubmit={this.handleSubmit}>
          <Input name='email' type='email' label='Email' s={6} onChange={this.handleChange} />
          <Input name='password' type='password' label='Password' s={6} onChange={this.handleChange} />
          <Button waves='light' className='button' onClick={this.handleSubmit}>Login</Button>
          <Button waves='light' className='button' onClick={this.handleGoogle}>Login With Google</Button>
        </Row>
      </div>
    )
  }
}

const addDispatcher = (connector) => ({
  checkUser() {
    return connector.props.auth
  }
})

export default firebaseConnect(null, addDispatcher)(withRouter(Login))
