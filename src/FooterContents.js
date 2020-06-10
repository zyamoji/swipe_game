import React from 'react';

// フッターの表示
class FooterContents extends React.Component {
    render() {
        let footerText = (
            <div className="TapToStart">
                Tap to start
            </div>
        )

        // ゲーム中は表示しない
        if (this.props.isGaming) {
            footerText = <div></div>
        }

        // タイマーが終わったら終わったとき用の表示
        if (this.props.gameTimer <= 0) {
            footerText = (
                <div>
                    <div className="FinishText">
                        Finish!
                    </div>
                    <div className="restartBtn" onClick={() => alert('click')}>
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

export default FooterContents