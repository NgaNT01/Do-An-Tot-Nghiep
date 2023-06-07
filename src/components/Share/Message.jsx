import React from 'react';
import {StyledMessage} from "./Message.styled";

const Message = ({time, username, content}) => {
    return (
        <StyledMessage>
            <div className="message">
                <span style={{fontSize: '18px',marginRight: '5px'}}>{time}]</span>
                <span style={{color: 'rgb(138, 142, 202)',fontSize: '18px',marginRight: '5px'}}>{username}: </span>
                <span style={{fontSize: '18px'}}>{content}</span>
            </div>
        </StyledMessage>
    );
};

export default Message;