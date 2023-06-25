import React, {useEffect} from 'react';
import {StyledGeneralResult} from "./GeneralResult.styled";
import ChannelsDesktop from "../../components/Channels/ChannelsDesktop/ChannelsDesktop";
import UsersDesktop from "../../components/Users/UsersDesktop";
import {useDispatch, useSelector} from "react-redux";
import {getAllUserByUsername} from "../../store/user";

const GeneralResult = ({currentListUser}) => {
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])


    return (
        <div>
            {currentListUser.length > 0 ?
                <StyledGeneralResult>
                    <div className="live-box">
                        <div className="title-bar">
                            <div className="title">Trực tiếp</div>
                            <div className="more"></div>
                        </div>
                        <div className="list live-list">
                            {/*<ChannelsDesktop/>*/}
                        </div>
                    </div>
                    <div className="user-box">
                        <div className="title-bar">
                            <div className="title">User</div>
                            <div className="more"></div>
                        </div>
                        <div className="list user-list">
                            <UsersDesktop currentListUsers={currentListUser}/>
                        </div>
                    </div>
                    <div className="video-box">
                        <div className="title-bar">
                            <div className="title">Video</div>
                            <div className="more"></div>
                        </div>
                        <div className="list video-list"></div>
                    </div>
                </StyledGeneralResult> :
                <StyledGeneralResult>
                    <span>Chưa có phát trực tiếp nào</span>
                </StyledGeneralResult>
            }
        </div>
    );
};

export default GeneralResult;