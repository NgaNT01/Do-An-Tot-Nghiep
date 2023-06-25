import React, {useEffect, useState} from 'react';
import {StyledRecordVideo} from "./RecordVideo.styled";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getRecordByStreamId} from "../../store/record_video";
import Header from "../../components/Header/Header";

const RecordVideo = () => {
    const [streamId, setStreamId] = useState(useParams().streamId);
    const [recordUrl, setRecordUrl] = useState(null)
    const dispatch = useDispatch();

    useEffect(async () => {
        const result = await dispatch(getRecordByStreamId(streamId));
        setRecordUrl(result.payload.recordUrl);
        console.log(recordUrl);
    }, [])

    return (
        <>
            <Header mySize="1848" />
            <StyledRecordVideo>
                <div className="video-box">
                    <video
                        src={recordUrl}
                        autoPlay
                        controls
                        playsInline
                        width="1536px"
                        height="700px"
                    >

                    </video>
                </div>
            </StyledRecordVideo>
        </>
    );
};

export default RecordVideo;