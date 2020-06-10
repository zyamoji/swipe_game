import React from 'react'

// 残り時間の表示
// 放っておくと、-1で止まるので、0未満は0と表示
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

export default LeftTime