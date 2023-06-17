import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import VideoDesktop from "./VideoDesktop";
import {StyledVideosDesktop} from "./VideoDesktop.styled";

const VideosDesktop = ({ title, currentBroadcastingStreams }) => {
    // const {currentBroadcastingStreams} = useSelector(state => state.stream);
    const dispatch = useDispatch();

    useEffect(() => {
    },[])

    return (
        <StyledVideosDesktop>

            <div className="channels-box">
                {title && <h1>{title}</h1>}
                {currentBroadcastingStreams.length === 0 ? <div style={{marginTop: '20px',marginLeft: '20px',fontSize: '20px'}}>Hiện chưa có livestream nào đươc phát</div> :
                    <div className="list">
                        {currentBroadcastingStreams.map((stream, index) => {
                            if (index < 6)
                                return (
                                    <VideoDesktop
                                    />
                                );
                        })}
                    </div>
                }
            </div>
        </StyledVideosDesktop>
    );
};

export default VideosDesktop;