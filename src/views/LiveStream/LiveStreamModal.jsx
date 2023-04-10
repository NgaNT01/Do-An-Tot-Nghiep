import React, {useState} from 'react';

const LiveStreamModal = ({onClose}) => {
    const [roomName, setRoomName] = useState('');
    const [streamTitle, setStreamTitle] = useState('');

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const handleStreamTitleChange = (event) => {
        setStreamTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onClose(roomName, streamTitle);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Live Stream Setup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="room-name">Room Name:</label>
                        <input type="text" id="room-name" value={roomName} onChange={handleRoomNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stream-title">Stream Title:</label>
                        <input type="text" id="stream-title" value={streamTitle} onChange={handleStreamTitleChange} />
                    </div>
                    <button type="submit">Start Live Stream</button>
                </form>
            </div>
        </div>
    );
};

export default LiveStreamModal;