import React, { Component } from 'react'
import { Button } from 'react-materialize'
import { Link } from 'react-router-dom'

import './landing.css'

class LandingPage extends Component {
  render() {
    return (
      <div>
        <img className="title-img" alt="title background"
          src="/titleimg.gif" />
        <div className="title">
          <img alt="titlepage" src="/title.png" />
        </div>
        <div className="title-buttons">
          <Link to="/login"><Button className="title-button" waves="purple">Login</Button></Link>
          <Link to="signup"><Button className="title-button" waves="purple">Sign up</Button></Link>
        </div>
      </div>
    )
  }
}

export default LandingPage
