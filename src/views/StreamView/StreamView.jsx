import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyledStreamView} from "./StreamView.styled";
import {WebRTCAdaptor} from "../../utils/js/webrtc_adaptor";
import {Link, useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import {getCurrentUser} from "../../utils/auth";
import {Button, Input} from "antd";
import Message from "../../components/Share/Message";
import {ShareAltOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {getUserByName} from "../../store/user";
import {getStreamInfoByUserName} from "../../store/streams";

const StreamView = () => {
    let webRTCAdaptor = null;
    const [webRTC, setWebRTC] = useState(null);
    const [mediaConstraints,setMediaConstraints] = useState({video: false, audio: false});
    const [streamName,setStreamName] = useState(useParams().username);
    const [token, setToken] = useState('');
    const [pc_config] = useState({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]})
    const [sdpConstraints,setSdpConstraints] = useState({OfferToReceiveAudio: true,OfferToReceiveVideo: true})
    const [websocketURL,setWebsocketURL] = useState("ws://188.166.221.237:5080/WebRTCAppEE/websocket");
    const [isShow, setIsShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const chatMessageRef = useRef(null);
    const dispatch = useDispatch();
    const [streamerInfo, setStreamerInfo] = useState(null);
    const [streamInfo, setStreamInfo] = useState(null);

    useEffect(async () => {
        webRTCAdaptor = initiateWebrtc();
        setWebRTC(webRTCAdaptor);
        setIsShow(true);
        const streamer_info = await dispatch(getUserByName(streamName));
        setStreamerInfo(streamer_info.payload)
        const streamInfo = await dispatch(getStreamInfoByUserName(streamName));
        setStreamInfo(streamInfo.payload);
        return () => {
            webRTCAdaptor.stop(streamName);
        }
    },[]);

    useEffect(() => {
        chatMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages])

    function initiateWebrtc() {
        return new WebRTCAdaptor({
            websocket_url: websocketURL,
            mediaConstraints: mediaConstraints,
            peerconnection_config: pc_config,
            sdp_constraints: sdpConstraints,
            remoteVideoId: "video",
            isPlayMode: true,
            debug: true,
            candidateTypes: ["tcp", "udp"],
            callback: function (info, obj) {
                if (info === "initialized") {
                    console.log("initialized");
                    onStartPlaying(streamName);

                } else if (info === "play_started") {
                    //joined the stream
                    console.log("play started");


                } else if (info === "play_finished") {
                    //leaved the stream
                    console.log("play finished");

                } else if (info === "closed") {
                    //console.log("Connection closed");
                    if (typeof obj != "undefined") {
                        console.log("Connecton closed: "
                            + JSON.stringify(obj));
                    }
                } else if (info === "streamInformation") {


                } else if (info === "ice_connection_state_changed") {
                    console.log("iceConnectionState Changed: ", JSON.stringify(obj));
                } else if (info === "updated_stats") {
                    console.log("Average incoming kbits/sec: " + obj.averageIncomingBitrate
                        + " Current incoming kbits/sec: " + obj.currentIncomingBitrate
                        + " packetLost: " + obj.packetsLost
                        + " fractionLost: " + obj.fractionLost
                        + " audio level: " + obj.audioLevel);

                }
                else if (info === "data_channel_opened") {

                    console.log("data channel is open");

                }
                else if (info === "data_channel_error") {

                } else if (info === "data_channel_closed") {

                    console.log("Data channel closed " );
                }else if (info === "data_received") {
                    handleDisplayChat(obj.data);
                } else if (info === "bitrateMeasurement") {
                    // console.log(info + " notification received");

                    // console.log(obj);
                } else {
                    // console.log(info + " notification received");
                }
            },
            callbackError: function (error) {
                //some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

                console.log("error callback: " + JSON.stringify(error));
                // alert(JSON.stringify(error));
                alert("stream nay khong ton tai");
            }
        });
    }

    const onStartPlaying = (streamName) => {
        console.log(webRTC);
        webRTCAdaptor.play(streamName, token);
    }

    const handleDisplayChat = (message) => {
        setChatMessages((messages) => [...messages, message]);
        console.log(chatMessages);
    }
    const onEnterChat = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        let now = new Date();
        webRTC.sendData(streamName, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${e.target.value}`);
        setChatMessages(messages => [...messages, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${e.target.value}`]);
        setInputValue('');
    }

    return (
        <>
            <Header mySize="1848" />
            <StyledStreamView>
                <div className="stream-view-wrap">
                    <div className="stream-view-box">
                        <div className="video-view">
                            <video id="video" autoPlay width="640px" height="480px" controls playsInline></video>
                        </div>
                        <div className="user-info">
                            <div className="left">
                                <div className="pp">
                                    <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="" />
                                </div>
                                <div className="profile-info">
                                    <div className="title">{streamerInfo === null ? "streamer" : streamerInfo.username}</div>
                                    <div className="game">{streamInfo === null ? "description" : streamInfo.description}</div>
                                    <div className="tags">
                                        {streamInfo === null ? "category" :
                                            streamInfo.categories.map((category,index) => {
                                                return <div className="tag">
                                                    {category.name}
                                                </div>
                                            })}

                                        {/*<div className="tag">Esports</div>*/}
                                    </div>
                                </div>
                                <div className="buttons">
                                    <UserOutlined style={{marginLeft: '800px',marginTop: '14px'}}/> <span style={{marginTop: '14px',marginLeft: '5px'}}>1</span>
                                    <Button type="primary" size="large" style={{marginLeft: '50px'}}>+ Theo dõi</Button>
                                    <Button size="large" style={{marginLeft: '10px'}}><ShareAltOutlined/>Chia sẻ</Button>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className="chat-box">
                        <div className="header-box">
                            <div className="live-chat-banner">Trò chuyện LIVE</div>
                        </div>
                        <div className="chat-messages" ref={chatMessageRef}>
                            {chatMessages.map((message, index) => {
                                const time_username = message.split(": ")[0];
                                const username = time_username.split("] ")[1];
                                const time = time_username.split("] ")[0];
                                const content = message.split(": ")[1];
                                return (
                                    <Message time={time} username={username} content={content}></Message>
                                )
                            })}
                        </div>
                        {getCurrentUser() !== null ? <div className="box-footer">
                            <Input
                                placeholder="Nói chuyện chút nào!"
                                onPressEnter={onEnterChat}
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                            >

                            </Input>
                            <Button type="primary" size="large" className="send-button">Gửi</Button>
                            <Button type="primary" size="large" className="image-button">Ảnh</Button>
                        </div> :
                        <div className="box-footer-unlogin">
                            <span style={{fontWeight: 'bolder'}}>Nhớ 8 với những người xem chung nhé</span>
                            <span style={{fontWeight: 'lighter'}}>Đăng nhập để tham gia trò chuyện</span>
                            <Link className="signin-btn" to='/auth/sign-in'>
                                <Button className="signin-btn" type="primary" size="large">Đăng nhập</Button>
                            </Link>
                        </div>}
                    </div>
                </div>
            </StyledStreamView>
        </>
    );
};

export default StreamView;