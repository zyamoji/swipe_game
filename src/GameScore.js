import React from 'react';

// ゲーム中スコアの表示
class GameScore extends React.Component {
    render() {
        return (
            <div className="GameScore">
                Score: {this.props.score}
            </div>
        )
    }
}

export default GameScore