import React, { Component } from 'react'
import Wander from './img/wander.jpg'
import Bat from './img/bat.jpg'
import Stare from './img/stare.jpg'
import Feed from './img/feed.jpg'
import StatusSheet from './component/statusSheet'
import Squeak from './sound/Copy of TS5 Squeaky.mp3'
import Meow from './sound/Copy of AlleyCat.wav'
import Grid from '@material-ui/core/Grid'
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Green from './img/green.jpg'

class Stage1 extends Component {
  constructor(props) {
    super(props)
    this.mousex = 0
    this.mousey = 0
    this.clock = 10
    this.littleClock = 0
    this.gamestate = 0
    this.shownext = "hidden"
    this.feeddelay = 0
    this.state = {
      img: Wander,
      score: 0,
      eat: 0,
      box: "green",
      time: 0,
      clock: 10
    }
    //function binds
    this.stare = this.stare.bind(this)
    this.wander = this.wander.bind(this)
    this.bat = this.bat.bind(this)
    this.feed = this.feed.bind(this)
    this.eating = this.eating.bind(this)
    this.fieldCalc = this.fieldCalc.bind(this)
  }

  componentDidMount() {
    let time = 0
    let boxC = "green"
    var audio1 = new Audio(Squeak)
    this.interval = setInterval(() => {
      time++
      this.fieldCalc()
      this.decTime()
      this.showhidden()
      this.feeddelay++
      if (time === 600) {
        audio1.play()        
        time = 0;
        boxC = "green"
        this.clock = 10

      }
      this.setState({ box: boxC, time: time })
    }, 17)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  showhidden() {
    if (this.state.score > 4) this.shownext = "visible"
  }

  decTime() {
    this.littleClock++
    if (this.littleClock === 60 && this.clock > 0) {
      this.clock--
      this.littleClock = 0
      this.setState({ clock: this.clock })
    }
  }

  fieldCalc() {
    let feeder = document.getElementById('#feeder')
    let feederRect = feeder.getBoundingClientRect()
    let proximity = document.getElementById('#proximity')
    let proximityRect = proximity.getBoundingClientRect()
    let toy = document.getElementById('#toy')
    let toyRect = toy.getBoundingClientRect()
    // console.log(" top: " + feederRect.top + " right: " + feederRect.right + " bottom: " + feederRect.bottom + " left: "  + feederRect.left)

    if (this.mousex > feederRect.left && this.mousex < feederRect.right && this.mousey > feederRect.top && this.mousey < feederRect.bottom) {
      if (this.gamestate != 1) {
        this.gamestate = 1
        console.log("feeder")
        this.feed()
      }
    } else if (this.mousex > toyRect.left && this.mousex < toyRect.right && this.mousey > toyRect.top && this.mousey < toyRect.bottom) {
      if (this.gamestate != 2) {
        this.gamestate = 2
        console.log("toy")
        this.bat()
      }
    } else if (this.mousex > proximityRect.left && this.mousex < proximityRect.right && this.mousey > proximityRect.top && this.mousey < proximityRect.bottom) {
      if (this.gamestate != 3) {
        this.gamestate = 3
        console.log("proximity")
        this.stare()
      }
    } else {
      this.gamestate = 0
      console.log("wander")
      this.wander()
    }

  }

  _onMouseMove(e) {
    this.mousex = e.pageX
    this.mousey = e.pageY
    console.log("x: " + e.pageX + " y: " + e.pageY)
  }


  stare() {
    let x = this.state.score
    if (this.state.box === "green" && this.feeddelay > 120) {
      x++
      this.feeddelay = 0
    }
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
        left: this.mousex + 20,
        top: this.mousey + 20,
        backgroundImage: `url(${Green})`
      },
      next: {
        visibility: this.shownext
      }
    }

    //  <div className="App" onMouseDown={this.bat} onMouseUp={this.stare} onMouseEnter={this.stare} onMouseLeave={this.wander} onClick={ () => audio.play() }>


    return(
      <div className="App">

        <StatusSheet score={this.state.score} eat={this.state.eat} />
        <Grid
          container
          direction="row"
          style={styles.bgCell}
          onMouseMove={this._onMouseMove.bind(this)}
        >
          <div style={styles.boxmove} />
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell}> 1 <br /> <div onClick={() => this.props.prev()}> prev </div> </Box>
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell}> {this.state.clock} <br /> <div style={styles.next} onClick={() => this.props.next()}> next </div> </Box>
          </Grid>

          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" id="#feeder" style={styles.cell} />
          </Grid>

          {/* proximity */}
          <Grid container item xs={6} spacing={0} >
            <Box border={1} borderColor="red" id="#proximity" style={styles.bigcell} >
              {/* toy box */}
              <Box border={1} borderColor="blue" style={styles.insidecell} id="#toy"  onClick={ () => audio.play()}/>
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

export default Stage1;
