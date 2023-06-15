import { StyledChannelDesktop } from "./ChannelDesktop.styled";

import { FaEllipsisV } from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {cleanUsersStreamList, getUserById} from "../../../store/user";
import {useEffect, useState} from "react";
import {unwrapResult} from "@reduxjs/toolkit";

const ChannelDesktop = ({ stream, imageId, video }) => {
    const dispatch = useDispatch();
    const onCleanListUser = () => {
        dispatch(cleanUsersStreamList());
    }

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(async () => {
        const result = await dispatch(getUserById(stream.userId));
        setCurrentUser(result.payload);
    },[])

  return (
        <StyledChannelDesktop>
            <NavLink to={`/live/${currentUser === null ? stream.userId : currentUser.username}`} onClick={onCleanListUser}>
                <div className="channel-box">
                    <div className="live-screen">

                        <img src="../../../../public/images/games/game-elder.jpg" alt="" />
                        <div className={`live ${video ? "invisible" : ""}`}>trực tiếp</div>
                        <div className={`viewers ${video ? "invisible" : ""}`}>
                            {/*{stream.viewerCount} người xem*/}
                        </div>
                        <div className={`video ${video ? "video-visible" : ""}`}>
                            <div className="video-tag top">11:44</div>
                            <div className="video-tag bottom-right">4 hours ago</div>
                            <div className="video-tag bottom">188 lượt xem</div>
                        </div>
                    </div>
                    <div className="channel-info">
                        <div className="left">
                            <div className="pp">
                                {currentUser !== null && currentUser.avatarUrl !== null ? <img src={currentUser.avatarUrl} alt="" />
                                    :
                                    <img src={`https://i.pravatar.cc/5${imageId}`} alt="" />}
                            </div>
                            <div className="profile-info">
                                <div className="title">{stream.streamName}</div>
                                <div className="username">{currentUser === null ? stream.userId : currentUser.username}</div>
                                <div className="game">{stream.description}</div>
                                {/*<div className="tags">*/}
                                {/*  <div className="tag">English</div>*/}
                                {/*  <div className="tag">Esports</div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <div className="right">
                            <FaEllipsisV />
                        </div>
                    </div>
                </div>
            </NavLink>
        </StyledChannelDesktop>
  );
};

export default ChannelDesktop;
