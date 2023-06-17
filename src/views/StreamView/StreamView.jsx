import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyledStreamView} from "./StreamView.styled";
import {WebRTCAdaptor} from "../../utils/js/webrtc_adaptor";
import {Link, useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import {getCurrentUser} from "../../utils/auth";
import {Button, Input} from "antd";
import Message from "../../components/Share/Message";
import {HeartOutlined, LinkOutlined, ShareAltOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {getUserByName} from "../../store/user";
import {getStreamInfoByUserName} from "../../store/streams";
import axios from "axios";
import Icon from '@mdi/react';
import { mdiEmoticonHappyOutline } from '@mdi/js';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";
import {AiFillHeart, BsHeart, BsHeartFill} from "react-icons/all";

const StreamView = () => {
    let webRTCAdaptor = null;
    const [webRTC, setWebRTC] = useState(null);
    const [mediaConstraints,setMediaConstraints] = useState({video: false, audio: false});
    const [streamName,setStreamName] = useState(useParams().username);
    const [token, setToken] = useState('');
    const [pc_config] = useState({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]})
    const [sdpConstraints,setSdpConstraints] = useState({OfferToReceiveAudio: true,OfferToReceiveVideo: true})
    const [websocketURL,setWebsocketURL] = useState("wss://baongan.online:5443/WebRTCAppEE/websocket");
    const [isShow, setIsShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const chatMessageRef = useRef(null);
    const dispatch = useDispatch();
    const [streamerInfo, setStreamerInfo] = useState(null);
    const [streamInfo, setStreamInfo] = useState(null);
    const [webRTCViewerCount, setWebRTCViewerCount] = useState(null);
    const [isDisplayShareDialog, setIsDisplayShareDialog] = useState(false);
    const [isFollowed,setIsFollowed] = useState(false);

    useEffect(async () => {
        webRTCAdaptor = initiateWebrtc();
        setWebRTC(webRTCAdaptor);
        console.log("adaptor của viewer", webRTCAdaptor);
        setIsShow(true);
        const streamer_info = await dispatch(getUserByName(streamName));
        setStreamerInfo(streamer_info.payload)
        const streamInfo = await dispatch(getStreamInfoByUserName(streamName));
        setStreamInfo(streamInfo.payload);
        return () => {
            webRTCAdaptor.stop(streamName);
        }
    },[]);

    // useEffect(() => {
    //     chatMessageRef.current.scrollIntoView({ behavior: "smooth" });
    // }, [chatMessages])

    useEffect(() => {
        let interval = setInterval(() => {
            axios.get(`https://baongan.online:5443/WebRTCAppEE/rest/v2/broadcasts/${streamName}`).then((res) => {
                setWebRTCViewerCount(res.data.webRTCViewerCount);

            })

        }, 2000);
        return () => {
            clearInterval(interval);
        };
    },[])

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

    const onDisplayShareDialog = (e) => {
        e.stopPropagation();
        setIsDisplayShareDialog(!isDisplayShareDialog);
    }

    const onStartPlaying = async (streamName) => {
        const result = await dispatch(getStreamInfoByUserName(streamName));
        const streamId = result.payload.streamId;
        webRTCAdaptor.play(`${streamName}_${streamId}`, token);
    }

    const handleEmojiSelect = (emoji) => {
        setInputValue(inputValue + emoji.native);
    };

    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

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

    const onClickSend = () => {
        let now = new Date();
        webRTC.sendData(streamName, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${inputValue}`);
        setChatMessages(messages => [...messages, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${inputValue}`]);
        setInputValue('');
    }

    const handleClickOutsidePicker = () => {
        setShowPicker(false)
    }

    const handleClickOutsideScreen = () => {
        setIsDisplayShareDialog(false)
    }

    const onFollow = () => {
        setIsFollowed(!isFollowed);
    }

    return (
        <>
            <Header mySize="1848" />
            <StyledStreamView>
                <div className="stream-view-wrap" onClick={handleClickOutsideScreen}>
                    <div className="stream-view-box">
                        <div className="video-view">
                            <video id="video" autoPlay width="640px" height="480px" controls playsInline></video>
                        </div>
                        <div className="user-info">
                            <div className="left">
                                <div className="pp">
                                    {streamerInfo !== null && streamerInfo.avatarUrl !== null ?
                                        <img src={streamerInfo.avatarUrl} alt="" /> :
                                        <img src="/src/assets/images/user-icon-jpg-4.jpg" alt="" />}
                                </div>
                                <div className="profile-info">
                                    <div className="title">{streamerInfo === null ? "streamer" : streamerInfo.username}</div>
                                    <div className="game">{streamInfo === null ? "description" : streamInfo.description}</div>
                                    <div className="tags">
                                        {streamInfo === null ? "category" :
                                            streamInfo.categories.map((category,index) => {
                                                return <div key={index} className="tag">
                                                    {category.name}
                                                </div>
                                            })}

                                        {/*<div className="tag">Esports</div>*/}
                                    </div>
                                </div>
                                <div className="buttons">
                                    <UserOutlined style={{marginLeft: '780px',marginTop: '14px'}}/> <span style={{marginTop: '10px',marginLeft: '5px'}}>{webRTCViewerCount}</span>

                                    {isFollowed ? <Button onClick={onFollow} type="primary" size="large" style={{marginLeft: '50px'}}>
                                        <BsHeartFill style={{marginRight: '5px',marginBottom: '-3px'}}/> Đã theo dõi
                                    </Button> :
                                    <Button onClick={onFollow} type="primary" size="large" style={{marginLeft: '50px'}}>
                                        <BsHeart style={{marginRight: '5px',marginBottom: '-3px'}}/> Theo dõi
                                    </Button>
                                    }

                                    <Button
                                        size="large"
                                        style={{marginLeft: '10px'}}
                                        onClick={onDisplayShareDialog}
                                    >
                                        <ShareAltOutlined/>Chia sẻ
                                    </Button>
                                </div>
                                {isDisplayShareDialog && <div className="share-dialog">
                                    <h4 style={{textAlign: 'center',marginBottom: '5px'}}>Kêu gọi mọi người cùng xem nào</h4>
                                    <FacebookShareButton
                                        url={"tannga.space"}
                                        resetButtonStyle={false}
                                        style={{backgroundColor: 'white'}}
                                    >
                                        <svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="31" fill="#3b5998"></circle><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z" fill="white"></path></svg>
                                    </FacebookShareButton>
                                    <LinkedinShareButton
                                        title="UIT TV Livestream"
                                        source="tannga.space"
                                        url="tannga.space"
                                        style={{backgroundColor: 'white'}}
                                    >
                                        <svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="31" fill="#3b5998"></circle><path d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z" fill="white"></path></svg>
                                    </LinkedinShareButton>
                                    <TwitterShareButton
                                        url="tannga.space"
                                        style={{backgroundColor: 'white'}}
                                    >
                                        <svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="31" fill="#3b5998"></circle><path d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z" fill="white"></path></svg>
                                    </TwitterShareButton>
                                    <button style={{border: 'none',width: '70px',height: '70px',backgroundColor: 'white'}}>
                                        <img
                                            src="https://www.nimo.tv/nms/images/share-Embed.838038e25913624b73cd3cc8d1231630.png"
                                            style={{width: '70px',height: '70px'}}
                                        />
                                    </button>

                                </div>
                                }
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
                                    <Message key={index} time={time} username={username} content={content}></Message>
                                )
                            })}
                        </div>
                        {getCurrentUser() !== null ? <div className="box-footer">
                            <Input
                                placeholder="Nói chuyện chút nào!"
                                onPressEnter={onEnterChat}
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                                style={{width: '300px'}}
                            >

                            </Input>
                            <Button
                                type="primary"
                                size="large"
                                className="send-button"
                                onClick={onClickSend}
                            >
                                Gửi
                            </Button>
                            <Button
                                size="large"
                                onClick={togglePicker}
                                style={{fontSize: '20px'}}
                            >
                                😀
                            </Button>
                        </div> :
                        <div className="box-footer-unlogin">
                            <span style={{fontWeight: 'bolder'}}>Nhớ 8 với những người xem chung nhé</span>
                            <span style={{fontWeight: 'lighter'}}>Đăng nhập để tham gia trò chuyện</span>
                            <Link className="signin-btn" to='/auth/sign-in'>
                                <Button className="signin-btn" type="primary" size="large">Đăng nhập</Button>
                            </Link>
                        </div>}
                        {showPicker && (
                            <Picker
                                onEmojiSelect={handleEmojiSelect}
                                emojiSize={24}
                                showPreview={true}
                                data={data}
                                className="picker"
                                onClickOutside={handleClickOutsidePicker}
                            />
                        )}
                    </div>
                </div>
            </StyledStreamView>
        </>
    );
};

export default StreamView;