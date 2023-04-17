// THIS PAGE WAS BEING MADE IN ORDER TO LEARN THE CREATE ROOM AND JOIN ROOM TRICKS BY TAKING ONLINE HELP FROM OTHER WORK.




'use strict'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class FontAwesomerIcon extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      icon: null
    }
  }
  componentDidMount () {
    this.setState({
      icon: <FontAwesomeIcon {...this.props} />
    })
  }
  render () {
    return (
      <span>
        { this.state.icon }
      </span>
    )
  }
}