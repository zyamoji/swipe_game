import React from 'react';
import './App.css';
import TitleContents from './TitleContents'
import GameContents from './GameContents'
import FooterContents from './FooterContents'

// TODO: カウントダウン画面
class CountDown extends React.Component {
  render() {
    return (
      <div className="CountDown">
        3, 2, 1 ...
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
    // ゲーム中ならゲーム画面、そうでなければタイトル画面を表示
    let renderContents =
      this.state.isGaming ?
        <GameContents 
          gameTimer={this.state.gameTimer}
          isGaming={this.state.isGaming}       
        />
        :
        <TitleContents />
        
    // ↑で判定した画面にFooterを足して表示
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
