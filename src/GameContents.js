import React from 'react'
import GameScore from './GameScore'
import LeftTime from './LeftTime'
import SwipeRules from './SwipeRules'

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

    // 矢印列の更新用（正解なら取り除く）
    handleSwipeArrowChange(swipeArrow) {
        this.setState({
            swipeArrow: swipeArrow
        })
    }

    // 得点更新用
    handleScoreChange(score) {
        this.setState({
            score: score
        })
    }

    // 日付整形用
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

export default GameContents