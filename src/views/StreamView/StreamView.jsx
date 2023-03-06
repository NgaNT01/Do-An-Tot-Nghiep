import React from 'react';
import {StyledStreamView} from "./StreamView.styled";

const StreamView = () => {
    return (
        <StyledStreamView>
            <div className="stream-view">
                <video src="https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1057486-1570708_ProresV3-310383_Prores_v422_1547935_Blues_4k_GRADED_0050-high.mp4" autoPlay={true} controls></video>

            </div>
            <div className="user-info">
                <div className="left">
                    <div className="pp">
                        <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="" />
                    </div>
                    <div className="profile-info">
                        <div className="title">Title</div>
                        <div className="game">game</div>
                        <div className="tags">
                            <div className="tag">English</div>
                            <div className="tag">Esports</div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </StyledStreamView>
    );
};

export default StreamView;