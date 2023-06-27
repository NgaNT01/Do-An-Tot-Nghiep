import React, {useEffect} from 'react';
import {StyledVideoDesktop} from "./VideoDesktop.styled";
import {Link} from "react-router-dom";
import {FaEllipsisV} from "react-icons/fa";

const VideoDesktop = ({url,name,startTime,endTime,thumbnailUrl,streamId}) => {
    let start_time = new Date(startTime);
    let end_time = new Date(endTime)
    let currentTime = new Date();
    let videoLength = Math.floor((end_time - start_time)/1000)

    let timeDifference = currentTime - start_time;

    // Chuyển đổi khoảng thời gian thành giây
    let secondsDifference = Math.floor(timeDifference / 1000);

    // Tính số giờ, phút, giây từ khoảng thời gian
    let hours = Math.floor(secondsDifference / 3600);
    let minutes = Math.floor(secondsDifference/60);
    let seconds = secondsDifference % 60;
    let time;

    if (hours >= 24) {
        time = `${Math.floor(hours/24)} ngày`
    }
    else if (hours < 24) {
        if (minutes > 60) {
            time = `${hours} giờ`
        }
        else if (minutes < 60) {
            if (secondsDifference >= 60) {
                time = `${minutes} phút`
            }
            else if (secondsDifference < 60) {
                time = `${secondsDifference} giây`
            }
        }
    }

    const convertSecondsToHMS = (seconds) => {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;

        let hms = "";
        hms += hours.toString().padStart(2, "0") + ":";
        hms += minutes.toString().padStart(2, "0") + ":";
        hms += remainingSeconds.toString().padStart(2, "0");

        return hms;
    }

    useEffect(() => {
        console.log()
    })


    return (
        <StyledVideoDesktop>
            <Link to={`/video/${streamId}`}>
                <div className="channel-box">
                    <div className="live-screen">
                        <img style={{width: '330px',height: '210px'}} src={thumbnailUrl} alt="" />
                        {/*<div className={`live ${video ? "invisible" : ""}`}>trực tiếp</div>*/}
                        {/*<div className={`viewers ${video ? "invisible" : ""}`}>*/}
                        {/*    /!*{stream.viewerCount} người xem*!/*/}
                        {/*</div>*/}
                        <div className={`video ${url ? "video-visible" : ""}`}>
                            {/*<div className="video-tag top">{videoLength}</div>*/}
                            <div style={{fontWeight: 'bolder'}} className="video-tag bottom-right">{time} trước</div>
                            <div style={{fontWeight: 'bolder'}} className="video-tag bottom">{convertSecondsToHMS(videoLength)}</div>
                        </div>
                    </div>
                    <div className="channel-info">
                        <div className="left">
                            <div className="pp">

                            </div>
                            <div className="profile-info">
                                <div className="title">{name}</div>
                                {/*<div className="username">{currentUser === null ? stream.userId : currentUser.username}</div>*/}
                                {/*<div className="game">{stream.description}</div>*/}
                                {/*<div className="tags">*/}
                                {/*  <div className="tag">English</div>*/}
                                {/*  <div className="tag">Esports</div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        {/*<div className="right">*/}
                        {/*    <FaEllipsisV />*/}
                        {/*</div>*/}
                    </div>
                </div>
            </Link>
        </StyledVideoDesktop>
    );
};

export default VideoDesktop;