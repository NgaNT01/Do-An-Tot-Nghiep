import React from 'react';
import {StyledMessage} from "./Message.styled";

const Message = ({username, content}) => {
    return (
        <StyledMessage>
            <div className="message">
                <span style={{color: 'rgb(138, 142, 202)'}}>{username}</span>: {content}
            </div>
        </StyledMessage>
    );
};

export default Message;