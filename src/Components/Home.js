import React, {Component} from 'react'
import {Nav} from '../Components'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="home-container">
          <h5>WELCOME TO KATA CARDS</h5>
        </div>
      </div>
    )
  }
}

export default Home
