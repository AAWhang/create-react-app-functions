import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import GameOverSound from "./sound/Copy of Game End 1.mp3";
import Bluebutton from './img/buttonblue.png'
import ReactGA from "react-ga";

var gameOverSound = new Audio(GameOverSound);

class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.props.body}</Modal.Body>

          <Modal.Footer>

              <Button
                onClick={() => {
                  window.parent.postMessage(this.props.prize.eventName, "*");
                  ReactGA.event({
                    category: "Prizes",
                    action: "Clicked Redeem " + this.props.prize.prizeName
                  });
                  gameOverSound.play();
                }}
                variant="primary"
              >
                Redeem Prize
              </Button>

            <Button
              onClick={() => {
                if (this.props.onStart) {
                  this.props.onStart();
                  this.props.next()
                }
              }}
              variant="primary"
            >
              Next Level
            </Button>
            <img onClick={() => {window.parent.postMessage("showPopUpForPrize1")}} id="redeemButton" src={Bluebutton} />

          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Popup;
