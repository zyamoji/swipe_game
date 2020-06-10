import React from 'react'

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
        this.touchStartPos = { x: 0, y: 0 }
        this.touchEndPos = { x: 0, y: 0 }
        this.swipeDist = 30
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
        // イベントハンドラの定義
        // キー入力と、タッチ開始、タッチでドラッグ、タッチ終了を捕捉
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
            } else if (distX > this.swipeDist && Math.abs(distX) > Math.abs(distY)) {
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

    render() {
        let swipeArrow = this.props.swipeArrow
        let SwipeBoxArray = []
        let SwipeBoxStyle = { borderColor: "red" }
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

export default SwipeRules