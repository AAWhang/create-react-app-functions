import React, { Component } from 'react'
import Squeak from './sound/Copy of TS5 Squeaky.mp3'
import Bowl from './sound/food in bowl.mp3'
import Munch from './sound/aud_chomp.mp3'
import Meow from './sound/Copy of AlleyCat.wav'
import Grid from '@material-ui/core/Grid'
import { borders } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Green from './img/dogleft.png'
import Red from './img/dogright.png'
import Dogwait from './img/dogwait.png'
import Dogtouch from './img/dogtouch.png'
import Dogeat from './img/dogeat.png'
import Toy from './img/toynew.png'
import Toytilt from './img/toynew2.png'
import Feeder from './img/Feeder0.png'
import Feeder1 from './img/Feeder1.png'
import Feeder2 from './img/Feeder2.png'
import Feeder3 from './img/Feeder3.png'
import Timer from './img/timer.png'
import Frame1 from './img/frame1.png'
import Frame2 from './img/frame2.png'
import Frame3 from './img/frame3.png'
import Frame4 from './img/frame4.png'
import Timer00 from './img/clock0.png'
import Timer01 from './img/clock1.png'
import Timer02 from './img/clock2.png'
import Timer03 from './img/clock3.png'
import Timer04 from './img/clock4.png'
import Timer05 from './img/clock5.png'
import Timer06 from './img/clock6.png'
import Timer07 from './img/clock7.png'
import Timer08 from './img/clock8.png'
import Timer09 from './img/clock9.png'
import Timer10 from './img/clock10.png'
import Blank from './img/room6.png'
import Popup from "./popup6";
import ReactGA from "react-ga";

class Stage6 extends Component {
  constructor(props) {
    super(props)
    this.mousex = 0
    this.mousey = 0
    this.clock = 10
    this.littleClock = 0
    this.gamestate = 0
    this.dogpos = [320,500]
    this.mousepos = [700,500]
    this.mousesave = [0,0]
    this.dogsave = [0,0]
    this.dragflag = false
    this.dogdir = Dogwait
    this.score = 0
    this.food = 0
    this.eat = 0
    this.box = "green"
    this.shownext = "hidden"
    this.feeddelay = 0
    this.feederimg = Feeder
    this.toyimg = Toy
    this.eatlog = []
    this.clockimg = Timer10
    this.muted = false
    this.soundalternator = 0
    this.state = {
      isRunning: true,
      time: 0,
    }
    //function binds
    this.stare = this.stare.bind(this)
    this.wander = this.wander.bind(this)
    this.bat = this.bat.bind(this)
    this.eating = this.eating.bind(this)
    this.fieldCalc = this.fieldCalc.bind(this)
  }

  componentDidMount() {
    let staging = document.getElementById('#staging')
    let stagingRect = staging.getBoundingClientRect()
    this.dogpos = [stagingRect.left + 330,stagingRect.top + 300]
    let time = 0
    let boxC = "blue"
    var audio1 = new Audio(Squeak)
    var mewmew = new Audio(Meow)
    this.interval = setInterval(() => {
      if (!this.state.isRunning) {
        return;
      }
      time++
      this.fieldCalc()
      this.decTime()
      this.dogfollow()
      this.showhidden()
      this.feederstatus()
      this.clockstatus()
      this.feeddelay++
      if (time === 240) {
        let rand = Math.floor(Math.random() * Math.floor(4))
        console.log(rand)
        if (rand === 0)
          {
            mewmew.muted = this.muted
            mewmew.play()
          }
        }
        if (time === 420) {
          let rand = Math.floor(Math.random() * Math.floor(4))
          console.log(rand)
          if (rand === 0)
            {
              mewmew.muted = this.muted
              mewmew.play()
            }
          }

      if (time === 600) {
        let rand = Math.floor(Math.random() * Math.floor(2))
        console.log(rand)
        if (this.soundalternator === 1)
          {
            time = 0
            this.clock = 10
            this.soundalternator = 0
            mewmew.muted = this.muted
            mewmew.play()
          } else if (this.soundalternator === 0) {
            time = 0
            boxC = "green"
            this.clock = 10
            this.soundalternator = 1
            audio1.muted = this.muted
            audio1.play()
          }
      }
      if (time === 120 && boxC === "green") {
        boxC = "blue"
      }
      this.box = boxC
      this.setState({ time: time })
    }, 17)
    ReactGA.event({
      category: "Levels",
      action: "Started Level 6"
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  clockstatus() {
      switch (this.clock) {
        case 0: this.clockimg = Timer00
        break
        case 1: this.clockimg = Timer01
        break
        case 2: this.clockimg = Timer02
        break
        case 3: this.clockimg = Timer03
        break
        case 4: this.clockimg = Timer04
        break
        case 5: this.clockimg = Timer05
        break
        case 6: this.clockimg = Timer06
        break
        case 7: this.clockimg = Timer07
        break
        case 8: this.clockimg = Timer08
        break
        case 9: this.clockimg = Timer09
        break
        case 10: this.clockimg = Timer10
        break
      }
  }


  feederstatus() {
      switch (this.food) {
        case 0: this.feederimg = Feeder
        break
        case 1: this.feederimg = Feeder1
        break
        case 2: this.feederimg = Feeder2
        break
        case 3: this.feederimg = Feeder3
        break
      }
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
      if (this.dogpos[0] === leftright) this.dogdir = Dogwait
      if(this.gamestate === 2) this.dogdir = Dogtouch
      if(this.gamestate === 1) this.dogdir = Dogeat
      this.dogpos[1] = this.dogsave[1] + this.mousepos[1] - this.mousesave[1]
      this.boundary()
    }
  }

  boundary() {
      let staging = document.getElementById('#staging')
      let stagingRect = staging.getBoundingClientRect()
      if (stagingRect.left > this.dogpos[0]) {
        this.dogpos[0] = stagingRect.left
      }
      if (stagingRect.right - 200 < this.dogpos[0]) {
        this.dogpos[0] = stagingRect.right - 200
      }
      if (stagingRect.top > this.dogpos[1]) {
        this.dogpos[1] = stagingRect.top
      }
      if(stagingRect.bottom - 225 < this.dogpos[1]) {
        this.dogpos[1] = stagingRect.bottom - 225
      }
  }

  showhidden() {
    if (this.eatlog.length >= 3 && this.eatlog[this.eatlog.length -1] - this.eatlog[this.eatlog.length - 3] < 90000) {
        this.setState({ isRunning: false });
    }
  }

  decTime() {
    this.littleClock++
    if (this.littleClock === 60 && this.clock > 0) {
      this.clock--
      this.littleClock = 0
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

    if (this.dogpos[0] > feederRect.left - 150 && this.dogpos[0] < feederRect.right && this.dogpos[1] + 225 > feederRect.top && this.dogpos[1] < feederRect.bottom) {
      if (this.gamestate !== 1) {
        this.gamestate = 1
        console.log("feeder")
        this.eating()
      }
    } else if (this.dogpos[0] > toyRect.left && this.dogpos[0] < toyRect.right && this.dogpos[1] + 225 > toyRect.top && this.dogpos[1] < toyRect.bottom) {
      if (this.gamestate !== 2) {
        this.gamestate = 2
        console.log("toy")
        this.bat()
      }
    } else if (this.dogpos[0] > proximityRect.left && this.dogpos[0] < proximityRect.right && this.dogpos[1] > proximityRect.top && this.dogpos[1] < proximityRect.bottom) {
      if (this.gamestate !== 3) {
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

  _onTouchMove(e) {
    this.mousepos = [e.touches[0].clientX,e.touches[0].clientY]
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

  mutetoggle() {
    if (this.muted === true) this.muted = false
      else this.muted = true
  }

    stare() {
      this.toyimg = Toy
    }

    wander() {
      this.toyimg = Toy
    }

    bat() {
      if (this.box === "green" && this.feeddelay > 120) {
        var bowl = new Audio(Bowl)
        bowl.muted = this.muted
        bowl.play()
        this.score++
        this.food++
        this.feeddelay = 0
        let now = new Date()
        this.eatlog.push(now.getTime())
        console.log(this.eatlog)
      }
      this.toyimg = Toytilt
    }


    eating() {
      if (this.food > 0) {
        var munch = new Audio(Munch)
        munch.muted = this.muted
        munch.play()
        this.eat += this.food
        this.food = 0
      }
    }

    render() {
      var audio = new Audio(Squeak)
      const styles = {
        cell: {
          height: "100%",
          width: "80%",
        },
        bigcell: {
          height: "90%",
          width: "50%"
        },
        bgCell: {
          backgroundImage: `url(${Blank})`,
          backgroundRepeat: 'no-repeat',
          height: "600px",
          width: "800px",
          color: 'black',
          userSelect: 'none'
        },
        insidecell: {
          marginTop: '10%',
          height: '40%',
          width: '90%'
        },
        boxmove: {
          height: '30%',
          width: '20%',
          float: 'left',
          position: 'absolute',
          left: this.dogpos[0],
          top: this.dogpos[1],
          backgroundImage: `url(${this.dogdir})`,
          backgroundRepeat: 'no-repeat',
          zIndex:100
        },
        feeder: {
          marginTop: '80%',
          marginLeft: '120%',
          height: '40%',
          width: '100%'
        },
        next: {
          visibility: this.shownext
        },
        timer: {
          marginTop: '17%',
          marginLeft: '30%',
          width: '40%',
          height: '30%',
          backgroundRepeat: 'no-repeat',
        },
        timertext: {
          fontSize: 60,
          color: 'red',
          position: 'relative',
          float: 'right',
          top: '40%',
          left: '-50%'
        },
        frame1: {
          float: 'left',
          marginTop: '40%',
          marginLeft: '60%',
          height: '80%',
          width: '70%'
        },
        frame2: {
          float: 'left',
          marginTop: '30%',
          marginLeft: '25%',
          height: '100%',
          width: '100%',
        },
        frame3: {
          height: '100%',
          width: '100%',
          backgroundImage: `url(${Frame3})`,
          backgroundRepeat: 'no-repeat',
        },
        frame4: {
          height: '100%',
          width: '100%',
          backgroundImage: `url(${Frame4})`,
          backgroundRepeat: 'no-repeat',
        },
        frametext: {
          position: 'relative',
          float: 'right',
          top: '10%',
          left: '-40%',
          color: 'orange',
          fontWeight: 900
        }
      }

      //  <div className="App" onMouseDown={this.bat} onMouseUp={this.stare} onMouseEnter={this.stare} onMouseLeave={this.wander} onClick={ () => audio.play() }>

      // <div style={styles.next} onClick={() => this.props.next()}> next </div>

      return(
        <div className="App">
          <Popup
            show={!this.state.isRunning}
            next={this.props.next}
            title="Level 6 Complete"
            body="You learned how to adapt to the randomization of sounds. Congrats! You’ve completed the PupPod game.  "
            onStart={() => {
              this.setState({ isRunning: false });
            }}
          />
          <Grid
            container
            direction="row"
            id="#staging"
            style={styles.bgCell}
            onMouseMove={this._onMouseMove.bind(this)}
          >
          <div onMouseDown={this.dragOn.bind(this)} onMouseUp={this.dragOff.bind(this)} ontouchstart={this.dragOn.bind(this)} ontouchend={this.dragOff.bind(this)} style={styles.boxmove} />

          <Grid container item xs={3} spacing={0} >
            <div style={styles.cell}>
              {" "}
              <div style={styles.frame1}> <span style={styles.frametext} onClick={() => this.props.prev()} ontouchend={() => this.props.prev()}>Level 6</span></div> <br />
              {" "}
            </div>
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <div style={styles.cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <div style={styles.cell} />
          </Grid>
          <Grid container item xs={3} spacing={0} >
            <div style={styles.cell}>
              <div style={styles.frame2}> <span style={styles.frametext}>Treats <br /> earned: <br /> {this.score} </span></div>
            </div>
          </Grid>


          {/* proximity */}
          <Grid container item xs={6} spacing={0} >
            <div id="#proximity" style={styles.bigcell} >
                                    <img  src={this.clockimg} style={styles.timer} id="#toy"  onClick={ () => audio.play()}/>
              {/* toy box */}
              <img  src={this.toyimg} style={styles.insidecell} id="#toy"  onClick={ () => audio.play()}/>
            </div>
          </Grid>



          <Grid container item xs={3} spacing={0} >
            <img src={this.feederimg} id="#feeder" style={styles.feeder} />
            <div onClick={() => {this.setState({ isRunning: false })}}> next </div>{" "}
            <div onClick={() => this.mutetoggle()}> mute </div>{" "}
          </Grid>



        </Grid>


      </div>

      )
    }
    }

export default Stage6;
