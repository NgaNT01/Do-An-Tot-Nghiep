import React, {useEffect, useRef, useState} from 'react';
import {StyledStreamView} from "./StreamView.styled";
import {useNavigate} from 'react-router-dom';

const StreamView = () => {
    const navigate = useNavigate();

    const refVideo = useRef();
    const [mediaStream, setMediaStream] = useState(null);
    let webRtcPeer;

    var ws = new WebSocket('wss://localhost:8443/call');

    ws.onopen = () => {
    }

    ws.onmessage = (message) => {
        let parsedMessage = JSON.parse(message.data);
        console.info('Received message: ' + message.data);

        switch (parsedMessage.id) {
            case 'viewerResponse':
                viewerResponse(parsedMessage);
                break;
            case 'iceCandidate':
                webRtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
                    if (error)
                        return console.error('Error adding candidate: ' + error);
                });
                break;
            case 'stopCommunication':
                dispose();
                break;
            default:
                console.error('Unrecognized message', parsedMessage);
        }
    }

    ws.onclose = () => {
    }

    function onOfferViewer(error, offerSdp) {
        if (error)
            return console.error('Error generating the offer');
        console.info('Invoking SDP offer callback function ' + location.host);
        let message = {
            id : 'viewer',
            sdpOffer : offerSdp
        }
        sendMessage(message);
    }

    const onIceCandidate = (candidate) => {
        console.log("Local candidate" + JSON.stringify(candidate));

        let message = {
            id : 'onIceCandidate',
            candidate : candidate
        };
        sendMessage(message);
    }

    const sendMessage = (message) => {
        let jsonMessage = JSON.stringify(message);
        console.log('Sending message: ' + jsonMessage);
        ws.send(jsonMessage);
    }

    function viewerResponse(message) {
        if (message.response != 'accepted') {
            var errorMsg = message.message ? message.message : 'Unknow error';
            console.info('Call not accepted for the following reason: ' + errorMsg);
            dispose();
        } else {
            webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
                if (error)
                    return console.error(error);
            });
        }
    }

    function dispose() {
        if (webRtcPeer) {
            webRtcPeer.dispose();
            webRtcPeer = null;
        }
    }

    const onClick = () => {

    }

    return (

        <StyledStreamView>
            <div className="stream-view">
                <a onClick={onClick}>Click to view</a>
                <video ref={refVideo} autoPlay width="640px" height="480px" controls playsInline></video>
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