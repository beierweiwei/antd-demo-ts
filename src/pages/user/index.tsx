import React, { Component } from 'react'

export default class User extends Component {
  componentWillMount () {
    console.log(this.props)
  }
  render() {
    return (
      <div>
        user
      </div>
    )
  }
}
