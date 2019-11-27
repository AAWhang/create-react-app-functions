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
import Green from './img/dogleft.bmp'
import Red from './img/dogright.bmp'
import Toy from './img/toy.png'
import Feeder from './img/PetTutor.jpg'
import Blank from './img/blank.jpg'

class Puppy extends Component {
  constructor() {
    super()
    this.mousex = 0
    this.mousey = 0
    this.clock = 90
    this.littleClock = 0
    this.gamestate = 0
    this.dogpos = [500,500]
    this.mousepos = [700,500]
    this.mousesave = [0,0]
    this.dogsave = [0,0]
    this.dragflag = false
    this.dogdir = Green
    this.state = {
      img: Wander,
      score: 0,
      eat: 0,
      time: 0,
      clock: 90
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
    this.interval = setInterval(() => {
      time++
      this.fieldCalc()
      this.decTime()
      this.dogfollow()
      this.setState({ time: time })
    }, 17)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  dogfollow() {
    // if (this.dogpos[0] < this.mousepos[0]) {
    //   this.dogpos[0] += 5
    //   this.dogdir = Red
    // }
    // if (this.dogpos[0] > this.mousepos[0]) {
    //   this.dogpos[0] -= 5
    //   this.dogdir = Green
    // }
    // if (this.dogpos[1] < this.mousepos[1]) this.dogpos[1] += 5
    // if (this.dogpos[1] > this.mousepos[1]) this.dogpos[1] -= 5
    if (this.dragFlag === true) {
      let leftright = this.dogpos[0]
      this.dogpos[0] = this.dogsave[0] + this.mousepos[0] - this.mousesave[0]
      if (this.dogpos[0] < leftright) this.dogdir = Green
      if (this.dogpos[0] > leftright) this.dogdir = Red
      this.dogpos[1] = this.dogsave[1] + this.mousepos[1] - this.mousesave[1]
    }
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

    if (this.dogpos[0] > feederRect.left && this.dogpos[0] < feederRect.right && this.dogpos[1] > feederRect.top && this.dogpos[1] < feederRect.bottom) {
      if (this.gamestate != 1) {
        this.gamestate = 1
        console.log("feeder")
        this.feed()
      }
    } else if (this.dogpos[0] > toyRect.left && this.dogpos[0] < toyRect.right && this.dogpos[1] > toyRect.top && this.dogpos[1] < toyRect.bottom) {
      if (this.gamestate != 2) {
        this.gamestate = 2
        console.log("toy")
        this.bat()
      }
    } else if (this.dogpos[0] > proximityRect.left && this.dogpos[0] < proximityRect.right && this.dogpos[1] > proximityRect.top && this.dogpos[1] < proximityRect.bottom) {
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
    this.mousepos = [e.pageX,e.pageY]
  }

  dragOn() {
    this.dragFlag = true
    this.mousesave = [...this.mousepos]
    this.dogsave = [...this.dogpos]
    console.log(this.dogsave + " " )
  }

  dragOff() {
    this.dragFlag = false
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
        backgroundImage: `url(${Blank})`,
        height: "600px",
        width: "800px",
        color: 'black',
        userSelect: 'none'
      },
      insidecell: {
        marginTop: '150px',
        marginLeft: '0px',
        height: '180px',
        width: '150px'
      },
      boxmove: {
        height: '150px',
        width: '150px',
        float: 'left',
        position: 'absolute',
        left: this.dogpos[0],
        top: this.dogpos[1],
        backgroundImage: `url(${this.dogdir})`
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
          <div onMouseDown={this.dragOn.bind(this)} onMouseUp={this.dragOff.bind(this)} style={styles.boxmove} />
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
            <Box border={1} borderColor="red" style={styles.cell}> {this.state.clock} <br /> <div onClick={() => this.props.next()}> next </div> </Box>
          </Grid>

          <Grid container item xs={3} spacing={0} >
            <Box border={1} borderColor="red" style={styles.cell}/>
          </Grid>

          {/* proximity */}
          <Grid container item xs={6} spacing={0} >
            <Box border={1} borderColor="red" id="#proximity" style={styles.bigcell} >
              {/* toy box */}
              <img  src={Toy} style={styles.insidecell} id="#toy"  onClick={ () => audio.play()}/>
            </Box>
          </Grid>



          <Grid container item xs={3} spacing={0} >
            <img src={Feeder} id="#feeder" style={styles.cell} />
          </Grid>


        </Grid>


      </div>
    )
  }
}

export default Puppy;
