import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReactLoading from "react-loading";
import { Row, Col } from 'antd';
import {StyledMyVideos} from "./MyVideo.styled";
import MyVideo from "./MyVideo";

const MyVideos = ({ title, currentListRecords }) => {
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.record)

    useEffect(() => {
        console.log(currentListRecords);
    },[])

    return (
        <StyledMyVideos>

            <div className="channels-box">
                {title && <h1>{title}</h1>}
                {currentListRecords.length === 0 ? <div style={{marginTop: '20px',marginLeft: '20px',fontSize: '20px'}}>Hiện chưa có video</div> :

                    <Row gutter={[16, 16]} wrap={true}>
                        {currentListRecords.map((record, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <MyVideo
                                    key={index}
                                    url={record.recordUrl}
                                    name={record.recordName}
                                    thumbnailUrl={record.thumbnailUrl}
                                    startTime={record.startTime}
                                    endTime={record.endTime}
                                    streamId={record.streamId}
                                    style={{display: 'inline-block'}}
                                />
                            </Col>
                        ))}
                    </Row>
                }
                <div className="react-loading">
                    {isLoading === true ? <ReactLoading  type="spinningBubbles" color="#622DF7"/> : <div/>}
                </div>
            </div>
        </StyledMyVideos>
    );
};

export default MyVideos;