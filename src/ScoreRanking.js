import React from 'react'

// スコア表の表示
// 上位3位を保存して表示
// 同点のときは新しい日付を保存
class ScoreRanking extends React.Component {

    render() {
        // ブラウザに保存したデータを読み込む
        const appKey = 'spoonMageMage'
        let storageData = localStorage.getItem(appKey)
        let savedRanking = storageData ? JSON.parse(storageData) : {
            'data': []
        }

        console.log(savedRanking['data'])

        const rows = []

        // 表形式に整形
        let tableHeader = <tr><td>Rank</td><td>Point</td><td>date</td></tr>
        savedRanking['data'].forEach((row, index) => {
            rows.push(
                <tr><td>{index + 1}</td><td>{row.point}</td><td>{row.date}</td></tr>
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

export default ScoreRanking