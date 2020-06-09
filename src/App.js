import React from 'react';
import logo from './logo.svg';
import './App.css';

class CountDown extends React.Component {
  render() {
    return (
      <div className="CountDown">
        3, 2, 1 ...
      </div>
    )
  }
}

class ScoreRanking extends React.Component {
  render() {
    return (
      <div className="ScoreDiv">
        Score
        <table className="ScoreTable">
          <tr><td>Rank</td><td>Point</td><td>date</td></tr>
          <tr><td>1</td><td>30</td><td>2020/06/09</td></tr>
        </table>
      </div>
      
    )
  }
}

class LeftTime extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const gameTimer = this.props.gameTimer
    return (
      <div className="LeftTime">
        Time: {gameTimer >= 0 ? gameTimer : 0}
      </div>
    )
  }
}

class GameScore extends React.Component {
  render() {
    return (
      <div className="GameScore">
        Score: 0
      </div>
    )
  }
}

class SwipeBox extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    const boxNo = this.props.no
    const boxStyle = this.props.borderStyle
    const swipeArrow = this.props.swipeArrow
    return (
      <div className="SwipeBox" style={boxStyle}>
        {swipeArrow[boxNo]}
      </div>
    )
  }
}

class SwipeRules extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputKey: ''
    }
    this.handleSwipeArrowChange = this.handleSwipeArrowChange.bind(this)
  }

  handleKeyDown(e) {
    e.preventDefault()
    let swipeArrow = this.props.swipeArrow
    let onSwipeArrowChange = this.props.onSwipeArrowChange
    // 入力との判定
    if (e.key === swipeArrow[0].toString()) {
      const newSwipeArrow = swipeArrow.slice()
      newSwipeArrow.shift()
      console.log(`hit! input is ${e.key} correct is ${swipeArrow[0]}`)
      onSwipeArrowChange(newSwipeArrow)
    } else {
      console.log(`no input is ${e.key} correct is ${swipeArrow[0]}`)
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this), false)
  }

  handleSwipeArrowChange(e) {
    this.props.handleSwipeArrowChange(e)
  }

  render() {
    let swipeArrow = this.props.swipeArrow
    let SwipeBoxArray = []
    let SwipeBoxStyle = {borderColor: "red"}
    for (let i = 0; i < 4; i++) {
      if (i !== 0) {
        SwipeBoxStyle = { borderColor: "black" }
      }
      SwipeBoxArray.push(
        <SwipeBox 
          no={i} 
          borderStyle={SwipeBoxStyle} 
          swipeArrow={swipeArrow}
        />
      )
    }



    return (
      <div className="SwipeRules">
        {SwipeBoxArray}
      </div>
    )
  }
}

class GameContents extends React.Component {
  constructor(props) {
    super(props)
    const swipeArrow = []
    // スワイプ矢印を作成
    for (let i = 0; i < 100; i++) {
      swipeArrow.push(Math.floor(Math.random() * 3))
    }

    this.state = {
      swipeArrow: swipeArrow,
      score: 0
    }
    this.handleSwipeArrowChange = this.handleSwipeArrowChange.bind(this)
  }

  handleSwipeArrowChange(swipeArrow) {
    this.setState({
      swipeArrow: swipeArrow
    })
  }

  render() {
    const gameTimer = this.props.gameTimer
    return (
      <div className="s">
        <GameScore></GameScore>
        <LeftTime gameTimer={gameTimer}></LeftTime>
        <SwipeRules
          swipeArrow={this.state.swipeArrow}
          onSwipeArrowChange={this.handleSwipeArrowChange}
        />
      </div>

    )
  }
}

class FooterContents extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isFinish = false
    let footerText = (
      <div className="TapToStart">
        Tap to start
      </div>
    )

    if (this.props.isGaming) {
      footerText = <div></div>
    }

    if (this.props.gameTimer <= 0) {
      footerText = (
        <div className="FinishText">
          Finish!
        </div>
      )
    } 
        
        
    return (
      <div>
        {footerText}
      </div>  
    )
  }
}

class TitleContents extends React.Component {
  render() {
    return (
      <div>
        <div className="GameTitle">フリックゲーム</div>
        <ScoreRanking></ScoreRanking>
        
      </div>
    )
  }
}


// ゲーム全体を描画するマスターコンポーネント
class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameScore: 0,
      gameTimer: 10,
      isGaming: false
    }
    this.handleGameScoreChange = this.handleGameScoreChange.bind(this)
    this.handleGameTimerChange = this.handleGameTimerChange.bind(this)
    this.handleIsGamingChange = this.handleIsGamingChange.bind(this)
  }

  handleGameScoreChange(gameScore) {
    this.setState({
        gameScore: gameScore
    })
  }

  handleGameTimerChange(gameTimer) {
    this.setState({
        gameTimer: gameTimer
    })
  }

  handleIsGamingChange(isGaming) {
    this.setState({
      isGaming: isGaming
    })
  }
  
  // タイトル画面をクリックすると、
  // ゲーム中に設定し、タイマー開始
  timerId = null
  clickGameStart = () => {
    this.setState({
      isGaming: true
    })
    this.timerId = setInterval(() => {
      if (this.state.gameTimer == 0) {
        clearInterval(this.timerId)
      }
      if (this.state.gameTimer -1 >= 0) {
        this.setState({ gameTimer: this.state.gameTimer - 1 })
      }
    }, 1000)
  }

    
  render() {
    let renderContents =
      this.state.isGaming ?
        <GameContents 
          gameScore={this.state.gameScore}
          onGameScoreChange={this.handleGameScoreChange}
          gameTimer={this.state.gameTimer}
          isGaming={this.state.isGaming}       
        />
        :
        <TitleContents />
        
    return (
      <div className="GameBoard" onClick={this.clickGameStart}>
        {renderContents}
        <FooterContents 
          gameTimer={this.state.gameTimer}
          isGaming={this.state.isGaming}
        />
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <GameBoard />
    </div>
  );
}

export default App;
