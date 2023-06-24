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
                <video
                    src="https://ngant01.sgp1.digitaloceanspaces.com/streams/tannga_3.mp4"
                    autoPlay
                    width="640px"
                    height="480px"
                    controls
                    playsInline
                >

                </video>
            </StyledRecordVideo>
        </>
    );
};

export default RecordVideo;