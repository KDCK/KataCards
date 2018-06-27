import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect';


export default function(ComposedComponent) {
  class AuthorizedUser extends Component {
    componentDidMount() {
      console.log(this.props);
    }

    render() {
      return (<ComposedComponent {...this.props} />)
    }
  }

  return firebaseConnect()(AuthorizedUser)
}