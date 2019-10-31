import React, { Component } from 'react'
import Wander from './img/wander.jpg'
import Bat from './img/bat.jpg'
import Stare from './img/stare.jpg'
import StatusSheet from './component/statusSheet'
import Squeak from './sound/Copy of TS5 Squeaky.mp3'
import Grid from '@material-ui/core/Grid'
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';

class Puppy extends Component {
  constructor() {
    super()
    this.state = {
      img: Wander,
      score: 0
    }
    //function binds
    this.stare = this.stare.bind(this)
    this.wander = this.wander.bind(this)
    this.bat = this.bat.bind(this)
  }

  stare() {
    let x = this.state.score
    x++
    this.setState({ img: Stare, score: x })
  }

  wander() {
    this.setState({ img: Wander })
  }

  bat() {
    this.setState({ img: Bat })
  }

  render() {
    var audio = new Audio(Squeak)
    const cell = {
      height: "200px",
      width: "200px",
    }
    const style = {
      backgroundImage: `url(${this.state.img})`,
      height: "600px",
      width: "800px"
    }

    //       <div className="App" onMouseDown={this.bat} onMouseUp={this.stare} onMouseEnter={this.stare} onMouseLeave={this.wander} onClick={ () => audio.play() }>


    return(
      <div className="App" onMouseDown={this.bat} onMouseUp={this.stare} onMouseEnter={this.stare} onMouseLeave={this.wander} onClick={ () => audio.play() }>
        <StatusSheet score={this.state.score} />
        <Grid
          container
          direction="row"
          style={style}
        >

          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>

          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>

          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={cell} />
          </Grid>

        </Grid>

      </div>
    )
  }
}

export default Puppy;
