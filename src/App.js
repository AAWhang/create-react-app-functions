import React, { Component } from 'react'
import Puppy from './puppy'
import './App.css'
import 'typeface-roboto';


class App extends Component {
  constructor() {
    super()
    this.state = {

    }
    //function binds
  }

  render() {
    return(
      <div>
        <header className="App-header">
          Hello World
          <Puppy />
        </header>
      </div>
    )
  }
}

export default App;
