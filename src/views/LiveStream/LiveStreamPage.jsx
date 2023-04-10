import React, {useState} from 'react';
import LiveStreamModal from "./LiveStreamModal";

const LiveStreamPage = ({roomName,streamTitle}) => {
    return (
        <div>
            <h2>Live Stream</h2>
            <p>Room Name: {roomName}</p>
            <p>Stream Title: {streamTitle}</p>
            <p>Start streaming...</p>
        </div>
    );
};

export default LiveStreamPage;