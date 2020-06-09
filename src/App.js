import React from 'react';
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
  displayRow() {

  }

  render() {
    const appKey = 'spoonMageMage'
    let storageData = localStorage.getItem(appKey)
    let savedRanking = storageData ? JSON.parse(storageData) : {
      'data': []
    }

    console.log(savedRanking['data'])

    const rows = []

    let tableHeader = <tr><td>Rank</td><td>Point</td><td>date</td></tr>
    savedRanking['data'].forEach((row, index) => {
      rows.push(
        <tr><td>{index+1}</td><td>{row.point}</td><td>{row.date}</td></tr>
      )
    })

    return (
      <div className="ScoreDiv">
        Score
        <table className="ScoreTable">
          <tbody>
            {tableHeader}
            {rows}
          </tbody>
        </table>
      </div>
      
    )
  }
}

class LeftTime extends React.Component {
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
        Score: {this.props.score}
      </div>
    )
  }
}

class SwipeBox extends React.Component {
  render() {
    const boxNo = this.props.no
    const boxStyle = this.props.borderStyle
    const swipeArrow = this.props.swipeArrow
    let displayArrow = ''
    // 0が↑、1が→、2が↓、3が←
    if (swipeArrow[boxNo] === 0) {
      displayArrow = <div className="upArrow">↑</div>
    } else if (swipeArrow[boxNo] === 1) {
      displayArrow = <div className="rightArrow">→</div>
    } else if (swipeArrow[boxNo] === 2) {
      displayArrow = <div className="downArrow">↓</div>
    } else if (swipeArrow[boxNo] === 3) {
      displayArrow = <div className="leftArrow">←</div>
    }
    
    return (
      <div className="SwipeBox" style={boxStyle} key={boxNo}>
        {displayArrow}
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
    this.touchStartPos = {x: 0, y: 0}
    this.touchEndPos = {x: 0, y: 0}
    this.swipeDist = 30
    this.handleSwipeArrowChange = this.handleSwipeArrowChange.bind(this)
  }

  // キー入力されると実行されるイベント
  handleKeyDown(e) {
    e.preventDefault()
    this.judgeArrow(e)
  }

  // 判定
  judgeArrow(e) {
    let swipeArrow = this.props.swipeArrow
    let onSwipeArrowChange = this.props.onSwipeArrowChange
    const gameTimer = this.props.gameTimer
    // 入力との判定
    if (gameTimer > 0 && e.key === swipeArrow[0].toString()) {
      const newSwipeArrow = swipeArrow.slice()
      newSwipeArrow.shift()
      console.log(`hit! input is ${e.key} correct is ${swipeArrow[0]}`)
      onSwipeArrowChange(newSwipeArrow)
      this.props.onScoreChange(this.props.score + 1)
    } else {
      console.log(`no input is ${e.key} correct is ${swipeArrow[0]}`)
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this), false)
    window.addEventListener('touchstart', (e) => {
      e.preventDefault()
      this.touchStartPos = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }
    })

    window.addEventListener('touchmove', (e) => {
      e.preventDefault()
      this.touchEndPos = {
        x: e.changedTouches[0].pageX,
        y: e.changedTouches[0].pageY
      }
    })

    window.addEventListener('touchend', (e) => {
      e.preventDefault()
      const distY = this.touchEndPos.y - this.touchStartPos.y
      const distX = this.touchEndPos.x - this.touchStartPos.x
      // 上
      if (distY < -1 * this.swipeDist && Math.abs(distY) > Math.abs(distX)) {
        const keyCode = {}
        keyCode.key = '0'
        this.judgeArrow(keyCode)
      } else if (distX >  this.swipeDist && Math.abs(distX) > Math.abs(distY)) {
        // 右
        const keyCode = {}
        keyCode.key = '1'
        this.judgeArrow(keyCode)
      } else if (distY > this.swipeDist && Math.abs(distY) > Math.abs(distX)) {
        // 下
        const keyCode = {}
        keyCode.key = '2'
        this.judgeArrow(keyCode)
      } else if (distX < -1 * this.swipeDist && Math.abs(distX) > Math.abs(distY)) {
        // 左
        const keyCode = {}
        keyCode.key = '3'
        this.judgeArrow(keyCode)
      }
    })
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
      swipeArrow.push(Math.floor(Math.random() * 4))
    }

    this.saved = false

    this.state = {
      swipeArrow: swipeArrow,
      score: 0
    }
    this.handleSwipeArrowChange = this.handleSwipeArrowChange.bind(this)
    this.handleScoreChange = this.handleScoreChange.bind(this)
  }

  handleSwipeArrowChange(swipeArrow) {
    this.setState({
      swipeArrow: swipeArrow
    })
  }

  handleScoreChange(score) {
    this.setState({
      score: score
    })
  }

  getDate() {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const day = dateObj.getDate()
    return `${year}/${month}/${day}`
  }

  render() {
    const gameTimer = this.props.gameTimer
    const appKey = 'spoonMageMage'
    const savedRanking = localStorage.getItem(appKey)
    const jsonRanking = savedRanking ? JSON.parse(savedRanking) : {
      'data': []
    }
    // 昇順に保存
    let insertIndex = jsonRanking['data'].length
    let isFind = false
    jsonRanking['data'].forEach((scoreData, index) => {
      if (this.state.score >= scoreData['point'] && !isFind) {
        insertIndex = index
        isFind = true
      }
    })
    jsonRanking['data'].splice(insertIndex, 0, {
      'point': this.state.score,
      'date': this.getDate()
    })
    // 最大で3つ保存
    if (jsonRanking['data'].length >= 4) {
      jsonRanking['data'].pop()
    }
    if (gameTimer <= 0 && !this.saved) {
      localStorage.setItem(appKey, JSON.stringify(jsonRanking))
      this.saved = true
    }
    return (
      <div className="s">
        <GameScore score={this.state.score}></GameScore>
        <LeftTime gameTimer={gameTimer}></LeftTime>
        <SwipeRules
          swipeArrow={this.state.swipeArrow}
          onSwipeArrowChange={this.handleSwipeArrowChange}
          score={this.state.score}
          onScoreChange={this.handleScoreChange}
          gameTimer={gameTimer}
        />
      </div>

    )
  }
}

class FooterContents extends React.Component {
  render() {
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
        <div>
          <div className="FinishText">
            Finish!
          </div>
          <div className="restartBtn" onClick={()=>alert('click')}>
                Reload to restart
          </div>
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
      gameTimer: 10,
      isGaming: false
    }
    this.handleGameTimerChange = this.handleGameTimerChange.bind(this)
    this.handleIsGamingChange = this.handleIsGamingChange.bind(this)
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
      if (this.state.gameTimer === 0) {
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
