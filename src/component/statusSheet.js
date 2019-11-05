import React, { Component } from 'react'


class StatusSheet extends Component {
  render() {
    return(
      <div>
      {this.props.score}
      <br />
      {this.props.eat} / 30
      </div>
    )
  }
}

export default StatusSheet
