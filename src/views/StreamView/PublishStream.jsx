import React, {useEffect, useState} from 'react';
import WebRTCAdaptor from "../../utils/webrtc_adaptor";
import {useParams} from "react-router-dom";

const PublishStream = () => {
    let webRTCAdaptor =null;

    const [mediaConstraints,setMediaConstraints] = useState({video: true, audio: true});
    const [pc_config] = useState({'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]})
    const [sdpConstraints,setSdpConstraints] = useState({OfferToReceiveAudio: false,OfferToReceiveVideo: false})
    const [websocketURL,setWebsocketURL] = useState("wss://tannga.space:5443/WebRTCAppEE/websocket");
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        webRTCAdaptor = initiateWebrtc();
        setIsShow(true);

        return () => {
            webRTCAdaptor.stop(streamName);
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

                } else if (info === "publish_started") {
                    //stream is being published
                    console.log("publish started");
                    alert("Da bat dau stream");
                    setIsShow(false);

                } else if (info === "publish_finished") {
                    //stream is being finished
                    console.log("Da ket thuc stream");
                    setIsShow(true);

                } else if (info === "closed") {
                    //console.log("Connection closed");
                    if (typeof obj != "undefined") {
                        console.log("Connection closed: "
                            + JSON.stringify(obj));
                    }
                } else if (info === "streamInformation") {


                } else if (info === "ice_connection_state_changed") {
                    console.log("iceConnectionState Changed: ", JSON.stringify(obj));
                } else if (info ==="updated_stats") {
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
            <div className="Publish">
                YOU ARE IN PUBLISH PAGE <br />
                <video id="localVideo" autoPlay controls playsInline></video>
                <br/>
                {/*{*/}
                {/*    isShow ? (*/}
                {/*        <button*/}
                {/*            onClick={this.onStartPublishing.bind(this, streamName)}*/}
                {/*            className="btn btn-primary"*/}
                {/*            id="start_play_button"> Start*/}
                {/*            Publish*/}
                {/*        </button>*/}
                {/*    ) : null*/}
                {/*}*/}
            </div>
        </>
    );
};

export default PublishStream;