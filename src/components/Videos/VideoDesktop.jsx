import React from 'react';
import {StyledVideoDesktop} from "./VideoDesktop.styled";
import {Link} from "react-router-dom";

const VideoDesktop = ({url,name,startTime,streamId}) => {
    return (
        <StyledVideoDesktop>
            <Link to={`/video/${streamId}`}>
                <span>{url}{name}{startTime}{streamId}</span>
            </Link>
        </StyledVideoDesktop>
    );
};

export default VideoDesktop;