import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-materialize'
import { Input } from 'semantic-ui-react'
import { firebaseConnect } from 'fire-connect'

import Spinner from '../Components/Loader/Spinner'
import firebase, { auth } from '../firebase'
import './Login.css'

const googleProvider = new firebase.auth.GoogleAuthProvider()

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      codeWarsName: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleGoogle = this.handleGoogle.bind(this)
  }

  componentDidMount() {
    this.props.checkUser().onAuthStateChanged(user => {
      if (user && this.props.match.url === '/login') {
        this.props.history.push('/update')
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
    this.props.history.push('/update')
    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(authUser => {
        this.setState(() => ({
          email: '',
          password: ''
        }))
      })
      .catch(error => {
        alert(
          'You need to sign up before you can log in! Click the signup tab to complete a signup form or login in with Google here.'
        )
      })
  }

  handleGoogle() {
    this.props.history.push('/update')
    firebase
      .auth()
      .signInWithRedirect(googleProvider)
      .then(result => {
      })
      .catch(error => {
        alert('code:', error.code, 'message:', error.message, 'credential: ', error.credential)
      })

  }

  render() {
    if (this.props.user) {
      return <Spinner />
    }
    return (
      <div className="login-outer-container">
        <Input
          className="login-input-wrapper"
          name="email"
          type="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <Input
          className="login-input-wrapper"
          name="password"
          type="password"
          placeholder="Password"
          s={4}
          onChange={this.handleChange}
        />
        <Button waves="light" className="login-input-button" onClick={this.handleSubmit}>
          Login
        </Button>
        <Button waves="light" className="login-input-button" onClick={this.handleGoogle}>
          Login With Google
        </Button>
      </div>
    )
  }
}

const addDispatcher = connector => ({
  checkUser() {
    return connector.props.auth
  }
})

export default firebaseConnect(null, addDispatcher)(withRouter(Login))
