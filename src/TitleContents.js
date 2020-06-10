import React from 'react';
import ScoreRanking from './ScoreRanking'

// タイトル画面の描画
// タイトルとスコアを表示
class TitleContents extends React.Component {
    render() {
        return (
            <div>
                <div className="GameTitle">フリックゲーム</div>
                <ScoreRanking />
            </div>
        )
    }
}

export default TitleContents