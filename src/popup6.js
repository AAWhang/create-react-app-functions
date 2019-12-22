import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Bluebutton from './img/buttonblue.png'
import GameOverSound from "./sound/Copy of Game End 1.mp3";
import ReactGA from "react-ga";

var gameOverSound = new Audio(GameOverSound);

class Popup extends Component {
  render() {
    const styles = {
      button: {
        height: "50%",
        width: "30%",
        float: "right"
      }
    }
    return (
      <div className="popup">
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{this.props.body}</Modal.Body>

          <Modal.Footer>
            {this.props.prize && (
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
            )}
            <img style={styles.button} onClick={() => {window.parent.postMessage("showPopUpForPrize1", "*")}} src={Bluebutton} />

          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Popup;
