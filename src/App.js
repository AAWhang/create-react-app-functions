import React, { Component } from 'react'
import Off from "./puppy"
import Stage1 from './stage1'
import Stage2 from './stage2'
import Stage3 from './stage3'
import Stage4 from './stage4'
import Stage5 from './stage5'
import Stage6 from './stage6'
import StageForm from './component/stageForm'
import './App.css'
import 'typeface-roboto';


class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedStage: "stage1",
      stage: <Stage1 stage={this.selectedStage}/>
    }
    //function binds
  }

  handleStageChange = changeEvent => {
    let x
    switch(changeEvent.target.value) {
      case "stage0": x = <Off stage={this.selectedStage}/>
      break
      case "stage1": x = <Stage1 stage={this.selectedStage}/>
      break
      case "stage2": x = <Stage2 stage={this.selectedStage}/>
      break
      case "stage3": x = <Stage3 stage={this.selectedStage}/>
      break
      case "stage4": x = <Stage4 stage={this.selectedStage}/>
      break
      case "stage5": x = <Stage5 stage={this.selectedStage}/>
      break
      case "stage6": x = <Stage6 stage={this.selectedStage}/>
      break
    }
    this.setState({ selectedStage: changeEvent.target.value, stage: x })
  }


  render() {
    return(
      <div>
        <header className="App-header">
          Hello World
          <StageForm stage={this.state.selectedStage} change={this.handleStageChange}/>
          {this.state.stage}
        </header>
      </div>
    )
  }
}

export default App;
