import React, { Component } from 'react'
import Puppy from './puppy'
import './App.css'


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
