import React, {useEffect, useState} from 'react';
// import {WebRTCAdaptor} from "@antmedia/webrtc_adaptor/target/StreamApp/js/webrtc_adaptor";
// import WebRTCAdaptor from '../../utils/webrtc_adaptor'
import {WebRTCAdaptor} from "../../utils/js/webrtc_adaptor";
import {useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import {StyledPublishStream} from "./PublishStream.styled";
import {useSelector} from "react-redux";
import {getCurrentUser} from "../../utils/auth";

const PublishStream = () => {
    let webRTCAdaptor =null;
    const {currentUser} = useSelector(state => state.user);

    const [streamName, setStreamName] = useState(useParams().streamName);
    const [mediaConstraints,setMediaConstraints] = useState({video: 'screen', audio: true});
    const [pc_config] = useState({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]})
    const [sdpConstraints,setSdpConstraints] = useState({OfferToReceiveAudio: false,OfferToReceiveVideo: false})
    const [websocketURL,setWebsocketURL] = useState("wss://tannga.space:5443/WebRTCAppEE/websocket");
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        webRTCAdaptor = initiateWebrtc();
        setIsShow(true);
        onStartPublishing(streamName);

        return () => {
            webRTCAdaptor.stop(streamName);
        }
    },[]);

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

                    alert("data channel is open");

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
                alert(JSON.stringify(error));
            }
        });
    }

    const streamChangeHandler = () => {

    }

    const onStartPublishing = (streamName) => {
        webRTCAdaptor.publish(streamName,'');
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
                        {getCurrentUser().username}
                        <ul>

                        </ul>
                    </div>
                </div>
            </StyledPublishStream>
        </>
    );
};

export default PublishStream;