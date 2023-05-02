import React, {useEffect, useRef, useState} from 'react';
import {WebRTCAdaptor} from "../../utils/js/webrtc_adaptor";
import {useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import {StyledPublishStream} from "./PublishStream.styled";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../utils/auth";
import {Button, Input} from "antd";
import Message from "../../components/Share/Message";

const PublishStream = () => {
    let webRTCAdaptor = null;
    const [webRTC,setWebRTC] = useState(null);
    const {currentUser} = useSelector(state => state.user);

    const [streamName, setStreamName] = useState(useParams().streamName);
    const [mediaConstraints,setMediaConstraints] = useState({video: 'camera', audio: true});
    const [pc_config] = useState({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]})
    const [sdpConstraints,setSdpConstraints] = useState({OfferToReceiveAudio: false,OfferToReceiveVideo: false})
    const [websocketURL,setWebsocketURL] = useState("wss://tannga.space:5443/WebRTCAppEE/websocket");
    const [isShow, setIsShow] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const chatMessageRef = useRef(null);

    useEffect(() => {

        webRTCAdaptor = initiateWebrtc();
        setWebRTC(webRTCAdaptor);
        setIsShow(true);
        onStartPublishing(streamName);

        return () => {
            webRTCAdaptor.stop(streamName);
        }
    },[]);

    const handleDisplayChat = (message) => {
        setChatMessages((messages) => [...messages, message]);
    }

    function initiateWebrtc() {
        let thiz = this;
        return new WebRTCAdaptor({
            websocket_url: websocketURL,
            mediaConstraints: mediaConstraints,
            peerconnection_config: pc_config,
            sdp_constraints: sdpConstraints,
            localVideoId: "localVideo",
            debug: true,
            bandwidth:2000,
            callback: function (info, obj) {
                if (info === "initialized") {
                    console.log("initialized",obj);

                } else if (info === "publish_started") {
                    //stream is being published
                    console.log("publish started");
                    alert("publish started");

                } else if (info === "publish_finished") {
                    //stream is being finished
                    console.log("publish finished");

                }
                else if (info === "data_channel_opened") {

                    console.log("data channel is open");

                }

                else if (info === "data_channel_error") {

                    // handleError(description);

                } else if (info === "data_channel_closed") {

                    console.log("Data channel closed " );
                }else if (info === "closed") {
                    //console.log("Connection closed");
                    if (typeof obj != "undefined") {
                        console.log("Connection closed: "
                            + JSON.stringify(obj));
                    }
                } else if (info === "streamInformation") {


                } else if (info === "ice_connection_state_changed") {
                    console.log("iceConnectionState Changed: ", JSON.stringify(obj));
                } else if (info === "updated_stats") {
                    //obj is the PeerStats which has fields
                    //averageIncomingBitrate - kbits/sec
                    //currentIncomingBitrate - kbits/sec
                    //packetsLost - total number of packet lost
                    //fractionLost - fraction of packet lost
                    console.log("Average incoming kbits/sec: " + obj.averageIncomingBitrate
                        + " Current incoming kbits/sec: " + obj.currentIncomingBitrate
                        + " packetLost: " + obj.packetsLost
                        + " fractionLost: " + obj.fractionLost
                        + " audio level: " + obj.audioLevel);

                } else if (info === "data_received") {
                    handleDisplayChat(obj.data);
                } else if (info === "bitrateMeasurement") {
                    // console.log(info + " notification received");

                    console.log(obj);
                } else {
                    // console.log(info + " notification received");
                }
            },
            callbackError: function (error) {
                //some of the possible errors, NotFoundError, SecurityError,PermissionDeniedError

                console.log("error callback: " + JSON.stringify(error));
                alert(JSON.stringify(error));
            }
        });
    }

    const streamChangeHandler = () => {

    }

    const onStartPublishing = (streamName) => {
        webRTCAdaptor.publish(streamName,'');
    }

    const onEnterChat = (e) => {
        console.log(e.target.value);
        webRTC.sendData(streamName, `${getCurrentUser().username}: ${e.target.value}`);
        setChatMessages(messages => [...messages, `${getCurrentUser().username}: ${e.target.value}`]);
        setInputValue('');
    }


    return (
        <>
            <StyledPublishStream>
                <Header mySize="1848" />
                <div className="publish-wrap">
                    <div className="livestream-box">
                        <video id="localVideo" muted autoPlay controls playsInline></video>
                    </div>
                    <div className="chat-box">
                        <div className="box-header"></div>
                        <div className="chat-messages" ref={chatMessageRef}>
                            {chatMessages.map((message, index) => {
                                const username = message.split(":")[0];
                                const content = message.split(":")[1];
                                return (
                                    <Message username={username} content={content}></Message>
                                )
                            })}
                        </div>
                        <div className="box-footer">
                            <Input
                                placeholder="Nhập tin nhắn"
                                onPressEnter={onEnterChat}
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                            >

                            </Input>
                            <Button type="primary" className="send-button" size="large">Gửi</Button>
                            <Button type="primary" className="image-button" size="large">Ảnh</Button>
                        </div>
                    </div>
                </div>
            </StyledPublishStream>
        </>
    );
};

export default PublishStream;