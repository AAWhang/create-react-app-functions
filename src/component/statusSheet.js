import React, { Component } from 'react'


class StatusSheet extends Component {
  render() {
    return(
      <div>
      Bowl: {this.props.score}
      <br />
      Treats eaten: {this.props.eat} / 4
      </div>
    )
  }
}

export default StatusSheet
