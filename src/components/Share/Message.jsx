import React from 'react';
import {StyledMessage} from "./Message.styled";

const Message = ({time, username, content}) => {
    return (
        <StyledMessage>
            <div className="message">
                <span style={{fontSize: '14px',marginRight: '5px'}}>{time}]</span> <span style={{color: 'rgb(138, 142, 202)'}}>{username}</span>: {content}
            </div>
        </StyledMessage>
    );
};

export default Message;