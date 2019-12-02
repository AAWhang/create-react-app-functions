import React, { Component } from "react";
import Landing from "./landing";
import Off from "./puppy";
import Stage1 from "./stage1";
import Stage2 from "./stage2";
import Stage3 from "./stage3";
import Stage4 from "./stage4";
import Stage5 from "./stage5";
import Stage6 from "./stage6";
import StageForm from "./component/stageForm";
import "./App.css";
import "typeface-roboto";
import ReactGA from "react-ga";
import { hotjar } from "react-hotjar";
import GameOverSound from "./sound/Copy of Game End 1.mp3";
import prizes from "./prizes";

var gameOverSound = new Audio(GameOverSound);

function initializeReactGA() {
  ReactGA.initialize("UA-152398982-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function initializeHotJar() {
  hotjar.initialize(1584254, 6);
}

class App extends Component {
  constructor() {
    initializeReactGA();
    // initializeHotJar();
    super();
    this.selectedStage = 1;
    this.state = {
      isStarted: false,
      stage: 1,
      prizeType: null,
      nextPrize: prizes[3]
    };
    this.nextStage = this.nextStage.bind(this);
    this.prevStage = this.prevStage.bind(this);
  }

  componentDidMount() {
    this.setState({
      stage: <Stage1 next={this.nextStage} prev={this.prevStage} />
    });
  }

  nextStage() {
    this.selectedStage += 1;
    this.handleStageChange();
  }

  prevStage() {
    this.selectedStage -= 1;
    this.handleStageChange();
  }

  handleStageChange() {
    let x;
    let prizeType = prizes[this.selectedStage];
    let nextPrize = null;
    switch (this.selectedStage) {
      case 0:
        x = <Off next={this.nextStage} prev={this.prevStage} />;
        nextPrize = prizes[3];
        break;
      case 1:
        x = <Stage1 next={this.nextStage} prev={this.prevStage} />;
        nextPrize = prizes[3];
        break;
      case 2:
        x = <Stage2 next={this.nextStage} prev={this.prevStage} />;
        nextPrize = prizes[3];
        break;
      case 3:
        x = <Stage3 next={this.nextStage} prev={this.prevStage} />;
        nextPrize = prizes[4];
        break;
      case 4:
        x = <Stage4 next={this.nextStage} prev={this.prevStage} />;
        nextPrize = prizes[5];
        break;
      case 5:
        x = <Stage5 next={this.nextStage} prev={this.prevStage} />;
        nextPrize = prizes[6];
        break;
      case 6:
        x = <Stage6 next={this.nextStage} prev={this.prevStage} />;
        break;
    }
    this.setState({ stage: x, prizeType: prizeType, nextPrize: nextPrize });
  }

  render() {
    let hasCurrentPrize = this.state.prizeType !== null;
    return (
      <div>
        <header className="App-header">
          {this.state.isStarted && this.state.stage}
          {!this.state.isStarted && (
            <Landing
              onStart={() => {
                this.setState({ isStarted: true });
              }}
            />
          )}
          {hasCurrentPrize && (
            <button
              onClick={() => {
                window.parent.postMessage(this.state.prizeType.eventName, "*");
                ReactGA.event({
                  category: "Prizes",
                  action: "Clicked Redeem " + this.state.prizeType.prizeName
                });
                gameOverSound.play();
              }}
              className="btn btn-primary"
              id="redeemButton"
            >
              Redeem Prize
            </button>
          )}
          {hasCurrentPrize && (
            <div id="current">
              Current prize: {this.state.prizeType.prizeName}
            </div>
          )}
          {this.state.nextPrize !== null && this.state.isStarted && (
            <div id="next">Next prize: {this.state.nextPrize.prizeName}</div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
