import React, { Component } from "react";
import StartSound from "./sound/Copy of Game Start 3.mp3";

var startSound = new Audio(StartSound);

class Landing extends Component {
  render() {
    return (
      <div>
        <div id="info"></div>

        <button
          className="btn btn-primary"
          id="playButton"
          onClick={() => {
            if (this.props.onStart) {
              this.props.onStart();
            }
            startSound.play();
          }}
        >
          Play PupPod
        </button>
      </div>
    );
  }
}

export default Landing;
