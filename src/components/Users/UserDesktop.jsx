import React from 'react';
import {StyledUserDesktop} from "./UserDesktop.styled";
import {getCurrentUser} from "../../utils/auth";
import {Link} from "react-router-dom";

const UserDesktop = ({userId, username, avatarUrl}) => {
    return (
        <div>
            <Link to={`/live/${username}`}>
                <StyledUserDesktop>
                    <div className="wrapper">
                        <div className="avatar">
                            {avatarUrl !== null ?
                                <img src={avatarUrl} /> :
                                <img
                                    src="data:image/png;base64,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"
                                    style={{borderRadius: '999px',width: '230px',height: '210px'}}
                                />
                            }
                        </div>
                        <div className="username">
                            <span>{username}</span>
                        </div>
                        <div className="follow-count">30 người theo dõi</div>
                    </div>
                </StyledUserDesktop>
            </Link>
        </div>
    );
};

export default UserDesktop;