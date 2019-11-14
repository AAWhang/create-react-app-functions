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
    this.selectedStage = 1
    this.state = {
      stage: 1
    }
    this.nextStage = this.nextStage.bind(this)
    this.prevStage = this.prevStage.bind(this)
  }

  componentDidMount() {
    this.setState({ stage: <Stage1 next={this.nextStage} prev={this.prevStage}/> })
  }

  nextStage() {
    this.selectedStage += 1
    this.handleStageChange()
  }

  prevStage() {
    this.selectedStage -= 1
    this.handleStageChange()
  }



  handleStageChange() {
    let x
    switch(this.selectedStage) {
      case 0: x = <Off next={this.nextStage} prev={this.prevStage}/>
      break
      case 1: x = <Stage1 next={this.nextStage} prev={this.prevStage}/>
      break
      case 2: x = <Stage2 next={this.nextStage} prev={this.prevStage}/>
      break
      case 3: x = <Stage3 next={this.nextStage} prev={this.prevStage}/>
      break
      case 4: x = <Stage4 next={this.nextStage} prev={this.prevStage}/>
      break
      case 5: x = <Stage5 next={this.nextStage} prev={this.prevStage}/>
      break
      case 6: x = <Stage6 next={this.nextStage} prev={this.prevStage}/>
      break
    }
    this.setState({ stage: x })
  }


  render() {
    return(
      <div>
        <header className="App-header">
          {this.selectedStage}
          Hello World
          {this.state.stage}
        </header>
      </div>
    )
  }
}

export default App;
