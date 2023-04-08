import React, {useEffect, useState} from 'react';
import {StyledStreamView} from "./StreamView.styled";
import { WebRtcPeer } from 'kurento-utils';
import { initializeApp } from "firebase/app" ;
import { getAnalytics } from "firebase/analytics" ;

const firebaseConfig = {
    apiKey : "AIzaSyBUomILMa_ENMoF-8S38LIg6BAXiF2Y2R4" ,
    authDomain : "uit-streaming.firebaseapp.com" ,
    projectId : "uit-streaming" ,
    storageBucket : "uit-streaming.appspot.com" ,
    messagingSenderId : "571386888996" ,
    appId : "1:571386888996:web:a7508b4331dcc2511029b1" ,
    measurementId : "G-X0LNFL1XD2"
};

// Initialize Firebase
const app = initializeApp ( firebaseConfig );
const analytics = getAnalytics ( app );

const StreamView = () => {

    const [video, setVideo] = useState(null);

    var ws = new WebSocket('wss://localhost:8443/call');

    useEffect(() => {
        setVideo(document.getElementById('video'));

    },[]);

    ws.onopen = () => {
        console.log(video);
    }

    ws.onmessage = (data) => {
        console.log(data.data);
    }

    ws.onclose = () => {
        console.log("da dong");
        var message1 = {
            id : 'stop',
        }
        var jsonMessage1 = JSON.stringify(message1);
        ws.send(jsonMessage1);
    }

    const onClick = () => {
        var message = {
            id : 'test',
        }
        var jsonMessage = JSON.stringify(message);

        ws.send(jsonMessage);
    }

    return (

        <StyledStreamView>
            <div className="stream-view">
                <video id="video" autoPlay width="640px" height="480px" controls playsInline></video>
            </div>
            <div className="user-info">
                <a style={{color: 'blue'}} onClick={onClick}>alo1234</a>
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