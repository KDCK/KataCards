import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Button } from 'react-materialize'
import { Icon } from 'semantic-ui-react'

import Login from '../Login'
import Signup from '../Signup'
import './landing.css'
import '../Login.css'

class LandingPage extends Component {
  state = {
    status: null
  }
  render() {
    return (
      <div>
        {this.props.user.mute ? null : (
          <ReactPlayer
            style={{ display: 'none' }}
            url="https://www.youtube.com/watch?v=2L39PYBKF_k"
            playing
            loop
          />
        )}
        <img className="title-img" alt="title background" src="/titleimg.gif" />
        <div className="title">
          <img alt="titlepage" src="/title.png" />
        </div>
        <div className="title-buttons">
          {this.state.status === null && (
            <div>
              <Button
                className="title-button login-input-button"
                onClick={() => this.setState({ status: 'login' })}
              >
                Login
              </Button>
              <Button
                className="title-button login-input-button"
                onClick={() => this.setState({ status: 'signup' })}
              >
                Sign up
              </Button>
            </div>
          )}
          {this.state.status === 'login' && (
            <div>
              <Login />
              <Button
                className="login-input-button"
                onClick={() => this.setState({ status: null })}
              >
                <Icon name="caret left" />
                Back
              </Button>
            </div>
          )}
          {this.state.status === 'signup' && (
            <div>
              <Signup />
              <Button
                className="login-input-button"
                onClick={() => this.setState({ status: null })}
              >
                <Icon name="caret left" />
                Back
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default LandingPage
