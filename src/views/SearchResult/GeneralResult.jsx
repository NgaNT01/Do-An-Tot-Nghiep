import React, {useEffect} from 'react';
import {StyledGeneralResult} from "./GeneralResult.styled";
import ChannelsDesktop from "../../components/Channels/ChannelsDesktop/ChannelsDesktop";
import UsersDesktop from "../../components/Users/UsersDesktop";
import {useDispatch, useSelector} from "react-redux";
import {getAllUserByUsername} from "../../store/user";
import VideosDesktop from "../../components/Videos/VideosDesktop";

const GeneralResult = ({currentListUser, currentListStream, currentListRecord}) => {
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])


    return (
        <div>
            {currentListUser.length || currentListStream.length > 0 || currentListRecord.length > 0 ?
                <StyledGeneralResult>
                    {currentListStream.length > 0 ? <div className="live-box">
                        <div className="title-bar">
                            <div className="title">Trực tiếp</div>
                            <div className="more"></div>
                        </div>
                        <div className="list live-list">
                            <ChannelsDesktop currentBroadcastingStreams={currentListStream}/>
                        </div>
                    </div> : <div/>}
                    {currentListUser.length > 0 ? <div className="user-box">
                        <div className="title-bar">
                            <div className="title">User</div>
                            <div className="more"></div>
                        </div>
                        <div className="list user-list">
                            <UsersDesktop currentListUsers={currentListUser}/>
                        </div>
                    </div> : <div/>}
                    {currentListRecord.length > 0 ? <div className="video-box">
                        <div className="title-bar">
                            <div className="title">Video</div>
                            <div className="more"></div>
                        </div>
                        <div className="list video-list">
                            <VideosDesktop currentListRecords={currentListRecord}/>
                        </div>
                    </div> : <div/>}
                </StyledGeneralResult> :
                <StyledGeneralResult>
                    <span>Chưa có phát trực tiếp nào</span>
                </StyledGeneralResult>
            }
        </div>
    );
};

export default GeneralResult;