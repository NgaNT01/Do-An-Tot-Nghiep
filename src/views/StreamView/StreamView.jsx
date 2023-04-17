import React, {useEffect, useRef, useState} from 'react';
import {StyledStreamView} from "./StreamView.styled";
import { WebRTCAdaptor } from '@antmedia/webrtc_adaptor';
import {useParams} from "react-router-dom";

const StreamView = () => {
    let webRTCAdaptor = null;

    const [mediaConstraints,setMediaConstraints] = useState({video: false, audio: false});
    const [streamName,setStreamName] = useState(useParams().username);
    const [token, setToken] = useState('');
    const [pc_config] = useState({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]})
    const [sdpConstraints,setSdpConstraints] = useState({OfferToReceiveAudio: true,OfferToReceiveVideo: true})
    const [websocketURL,setWebsocketURL] = useState("wss://tannga.space:5443/WebRTCAppEE/websocket");
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        webRTCAdaptor = initiateWebrtc();
        setIsShow(true);

        return () => {
        }
    },[]);

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

                } else if (info === "data_received") {
                    console.log("Data received: " + obj.event.data + " type: " + obj.event.type + " for stream: " + obj.streamId);
                } else if (info === "bitrateMeasurement") {
                    console.log(info + " notification received");

                    console.log(obj);
                } else {
                    console.log(info + " notification received");
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
        webRTCAdaptor.play(streamName, token);
    }

    return (

        <StyledStreamView>
            <div className="stream-view">
                <video id="video" autoPlay width="640px" height="480px" controls playsInline></video>
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