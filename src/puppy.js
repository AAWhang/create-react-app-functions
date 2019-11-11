import React, { Component } from 'react'
import Wander from './img/wander.jpg'
import Bat from './img/bat.jpg'
import Stare from './img/stare.jpg'
import Feed from './img/feed.jpg'
import StatusSheet from './component/statusSheet'
import Squeak from './sound/Copy of TS5 Squeaky.mp3'
import Grid from '@material-ui/core/Grid'
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Green from './img/green.jpg'

class Puppy extends Component {
  constructor() {
    super()
    this.mousex = 0
    this.mousey = 0
    this.state = {
      img: Wander,
      score: 0,
      eat: 0,
      time: 0
    }
    //function binds
    this.stare = this.stare.bind(this)
    this.wander = this.wander.bind(this)
    this.bat = this.bat.bind(this)
    this.feed = this.feed.bind(this)
    this.eating = this.eating.bind(this)
  }

  componentDidMount() {
    let time = 0
    this.interval = setInterval(() => {
      time++
      this.setState({ time: time })
    }, 17)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  _onMouseMove(e) {
    this.mousex = e.pageX
    this.mousey = e.pageY
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

  feed() {
    this.setState({ img: Feed})
  }

  eating() {
    let a = this.state.score
    let b = this.state.eat
    if (a > 0) {
      a--
      b++
    }
    this.setState({ score: a, eat: b })
  }

  render() {
    var audio = new Audio(Squeak)
    const styles = {
      cell: {
        height: "200px",
        width: "200px",
      },
      bigcell: {
        height: "400px",
        width: "400px"
      },
      bgCell: {
        backgroundImage: `url(${this.state.img})`,
        height: "600px",
        width: "800px",
        color: 'black'
      },
      insidecell: {
        marginTop: '150px',
        marginLeft: '110px',
        height: '180px',
        width: '150px'
      },
      boxmove: {
        height: '150px',
        width: '150px',
        float: 'left',
        position: 'absolute',
        left: this.mousex,
        top: this.mousey,
        backgroundImage: `url(${Green})`
      }
    }

    //  <div className="App" onMouseDown={this.bat} onMouseUp={this.stare} onMouseEnter={this.stare} onMouseLeave={this.wander} onClick={ () => audio.play() }>


    return(
      <div className="App">
        <div style={styles.boxmove} />
        <StatusSheet score={this.state.score} eat={this.state.eat} />
        <Grid
          container
          direction="row"
          style={styles.bgCell}
          onMouseMove={this._onMouseMove.bind(this)}
        >

          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell}> Off </Box>
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell} />
          </Grid>

          <Grid container item xs={3} spacing={0} onMouseEnter={this.feed} onMouseLeave={this.wander} onClick={ this.eating }>
            <Box border={1} borderColor="red" style={styles.cell} />
          </Grid>

          {/* proximity */}
          <Grid container item xs={6} spacing={0}  onMouseEnter={this.stare} onMouseLeave={this.wander} >
            <Box border={1} borderColor="red" style={styles.bigcell} >
              {/* toy box */}
              <Box border={1} borderColor="blue" style={styles.insidecell} onMouseDown={this.bat} onMouseUp={this.stare} onClick={ () => audio.play()}/>
            </Box>
          </Grid>


          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell}/>
          </Grid>


        </Grid>


      </div>
    )
  }
}

export default Puppy;
