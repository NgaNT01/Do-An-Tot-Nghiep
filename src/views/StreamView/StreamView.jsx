import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyledStreamView} from "./StreamView.styled";
import {WebRTCAdaptor} from "../../utils/js/webrtc_adaptor";
import {Link, useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import {getCurrentUser} from "../../utils/auth";
import {Button, Input, Modal} from "antd";
import Message from "../../components/Share/Message";
import {ExclamationCircleFilled, HeartOutlined, LinkOutlined, ShareAltOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {getUserByName} from "../../store/user";
import {getStreamInfoByUserName, stopStream} from "../../store/streams";
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
import {checkFollow, follow, unfollow} from "../../store/follow";
import Swal from "sweetalert2";

const StreamView = () => {
    let webRTCAdaptor = null;
    const [webRTC, setWebRTC] = useState(null);
    const [mediaConstraints,setMediaConstraints] = useState({video: false, audio: false});
    const {username} = useParams();
    const [streamName,setStreamName] = useState(username);
    const [token, setToken] = useState('');
    const [pc_config] = useState({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]})
    const [sdpConstraints,setSdpConstraints] = useState({OfferToReceiveAudio: true,OfferToReceiveVideo: true})
    const [websocketURL,setWebsocketURL] = useState("wss://maelewis.store:5443/WebRTCAppEE/websocket");
    const [isShow, setIsShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const chatMessageRef = useRef(null);
    const dispatch = useDispatch();
    const [streamerInfo, setStreamerInfo] = useState(null);
    const [streamInfo, setStreamInfo] = useState(null);
    const [noStreamMessage, setNoStreamMessage] = useState(null);
    const [webRTCViewerCount, setWebRTCViewerCount] = useState(null);
    const [isDisplayShareDialog, setIsDisplayShareDialog] = useState(false);
    const [isFollowed,setIsFollowed] = useState(null);
    const {confirm} = Modal;

    useEffect(() => {
        webRTCAdaptor = initiateWebrtc();
        setWebRTC(webRTCAdaptor);
        console.log("adaptor của viewer", webRTCAdaptor);
        setIsShow(true);


        return () => {
            webRTCAdaptor.stop(streamName);
        }
    },[]);

    useEffect(async () => {
        try {
            const streamer_info = await dispatch(getUserByName(streamName));
            setStreamerInfo(streamer_info.payload)

        } catch (error) {
            console.error('Error:', error);
        }
    }, [])

    useEffect(async () => {
        if (streamerInfo !== null) {
            const payload = {
                followerId: getCurrentUser().id,
                followingId: streamerInfo.userId
            }
            console.log("payload",payload)
            try {
                const is_followed_req = await dispatch(checkFollow(payload))
                console.log("is follow",is_followed_req);
                if (is_followed_req.payload.message === "Chua follow") setIsFollowed(false);
                else if (is_followed_req.payload.message === "Da follow") setIsFollowed(true);
            }
            catch (e) {
                console.log(e)
            }
        }
    }, [streamerInfo])

    useEffect(async () => {
        try {
            const result = await dispatch(getStreamInfoByUserName(streamName));
            if (result.payload.streamId) {
                setStreamInfo(result.payload);
            }
            else if (result.payload.message) {
                setNoStreamMessage(result.payload.message)
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        setStreamName(username);
    }, [username])

    useEffect(() => {

            let interval = setInterval(async () => {
                const result = await dispatch(getStreamInfoByUserName(streamName));
                const streamId = result.payload.streamId;
                axios.get(`https://maelewis.store:5443/WebRTCAppEE/rest/v2/broadcasts/${streamName}_${streamId}`).then((res) => {
                    setWebRTCViewerCount(res.data.webRTCViewerCount);
                })

            }, 2000);

        return () => {
            clearInterval(interval);
        };
    },[streamInfo])

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
                    onGetStreamInfo(streamName);

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
                    let streamResolutions = new Array();

                    obj["streamInfo"].forEach(function(entry) {
                        //It's needs to both of VP8 and H264. So it can be duplicate
                        if(!streamResolutions.includes(entry["streamHeight"])){
                            streamResolutions.push(entry["streamHeight"]);

                        }// Got resolutions from server response and added to an array.

                    });
                    console.log("hehe",streamResolutions)

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
                // alert("stream nay khong ton tai");
            }
        });
    }

    const onGetStreamInfo = async (streamName) => {
        const result = await dispatch(getStreamInfoByUserName(streamName));
        const streamId = result.payload.streamId;
        console.log("stream info");
        webRTC.getStreamInfo(`${streamName}_${streamId}`);
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
    const onEnterChat = async (e) => {
        console.log(e.target.value);
        e.preventDefault();
        let now = new Date();
        const result = await dispatch(getStreamInfoByUserName(streamName));
        const streamId = result.payload.streamId;
        webRTC.sendData(`${streamName}_${streamId}`, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${e.target.value}`);
        setChatMessages(messages => [...messages, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${e.target.value}`]);
        setInputValue('');
    }

    const onClickSend = async () => {
        let now = new Date();
        const result = await dispatch(getStreamInfoByUserName(streamName));
        const streamId = result.payload.streamId;
        webRTC.sendData(`${streamName}_${streamId}`, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${inputValue}`);
        setChatMessages(messages => [...messages, `[${now.toLocaleTimeString()}] ${getCurrentUser().username}: ${inputValue}`]);
        setInputValue('');
    }

    const handleClickOutsidePicker = () => {
        setShowPicker(false)
    }

    const handleClickOutsideScreen = () => {
        setIsDisplayShareDialog(false)
    }

    const onFollow = async () => {
        const payload = {
            followerId: getCurrentUser().id,
            followingId: streamerInfo.userId
        }
        const follow_req = await dispatch(follow(payload))
        await Swal.fire(
            'Thành công!',
            `Đã theo dõi ${streamerInfo.username}`,
            'success'
        )
        setIsFollowed(true);
    }

    const onUnFollow = () => {
        confirm({
            title: 'Bạn có chắc muốn hủy theo dõi?',
            icon: <ExclamationCircleFilled />,
            content: 'Nhấn Có để hủy',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {handleOkUnfollow()},
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const handleOkUnfollow = async () => {
        const payload = {
            followerId: getCurrentUser().id,
            followingId: streamerInfo.userId
        }
        await dispatch(unfollow(payload));
        await Swal.fire(
            'Thành công!',
            'Đã hủy theo dõi!',
            'success'
        )
        setIsFollowed(false)
    }

    const onForceStreamQuality = async () => {
        const result = await dispatch(getStreamInfoByUserName(streamName));
        const streamId = result.payload.streamId;
        webRTC.forceStreamQuality(`${streamName}_${streamId}`,480);
        webRTC.getStreamInfo(`${streamName}_${streamId}`);
    }

    return (
        <>
            <Header mySize="1848" />
            <StyledStreamView>
                <div className="stream-view-wrap" onClick={handleClickOutsideScreen}>
                    <div className="stream-view-box">
                        <div className="video-view">
                            {streamInfo ? <video id="video" autoPlay width="640px" height="480px" controls playsInline></video> :
                                <video id="video" autoPlay width="640px" height="480px"></video>
                            }
                            {streamInfo === null ? <div className="offline-banner">
                                <div className="offline-banner-box">
                                    NGOẠI TUYẾN
                                </div>
                             {streamerInfo !== null ? <span className="offline-banner-text">  {streamerInfo.username} đang ngoại tuyến.</span> : <span></span>}
                            </div> : <span></span>}
                        </div>
                        <div className="user-info">
                            <div className="left">
                                <div className="pp">
                                    {streamerInfo !== null && streamerInfo.avatarUrl !== null ?
                                        <img src={streamerInfo.avatarUrl} alt="" /> :
                                        <img
                                            src="data:image/png;base64,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"
                                            style={{borderRadius: '999px'}}
                                        />}
                                </div>
                                <div className="profile-info">
                                    <div className="title">{streamerInfo === null ? "streamer" : streamerInfo.username}</div>
                                    <div className="game">{streamInfo === null ? noStreamMessage : streamInfo.description}</div>
                                    <div className="tags">
                                        {streamInfo === null ? <div/> :
                                            streamInfo.categories.map((category,index) => {
                                                return <div key={index} className="tag">
                                                    {category.name}
                                                </div>
                                            })}

                                        {/*<div className="tag">Esports</div>*/}
                                    </div>
                                </div>
                                <div className="buttons">
                                    {streamInfo ? <UserOutlined style={{marginLeft: '780px',marginTop: '14px'}}/> : <span/>} <span style={{marginTop: '10px',marginLeft: '5px'}}>{webRTCViewerCount}</span>

                                    {isFollowed ? <Button onClick={onUnFollow} type="primary" size="large" style={{marginLeft: '30px'}}>
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
                                        url={window.location.href}
                                        resetButtonStyle={false}
                                        style={{backgroundColor: 'white'}}
                                    >
                                        <svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="31" fill="#3b5998"></circle><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z" fill="white"></path></svg>
                                    </FacebookShareButton>
                                    <LinkedinShareButton
                                        title="UIT TV Livestream"
                                        source="tannga.space"
                                        url={window.location.href}
                                        style={{backgroundColor: 'white'}}
                                    >
                                        <svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="31" fill="#3b5998"></circle><path d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z" fill="white"></path></svg>
                                    </LinkedinShareButton>
                                    <TwitterShareButton
                                        url={window.location.href}
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