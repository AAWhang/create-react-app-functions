import React, { Component } from "react";

class StatusSheet extends Component {
  render() {
    return (
      <div>
        Treats earned: {this.props.score}
        <br />
        Calories consumed: {this.props.eat}
      </div>
    );
  }
}

export default StatusSheet;
