import React, {useEffect} from 'react';
import {StyledUsersDesktop} from "./UserDesktop.styled";
import ChannelDesktop from "../Channels/ChannelsDesktop/ChannelDesktop";
import VideoDesktop from "../Videos/VideoDesktop";
import ReactLoading from "react-loading";
import {useSelector} from "react-redux";
import UserDesktop from "./UserDesktop";

const UsersDesktop = ({currentListUsers}) => {
    const {isLoading} = useSelector(state => state.user)

    useEffect(() => {
        // console.log(currentListUsers)
    }, [])


    return (
        <div>
            <StyledUsersDesktop>
                <div className="channels-box">
                    {currentListUsers.length === 0 ? <div style={{marginTop: '20px',marginLeft: '20px',fontSize: '20px'}}>Chưa tìm thấy streamer liên quan, vui lòng thay đổi từ khóa tìm kiếm</div> :
                        <div className="list">
                            {currentListUsers.map((user, index) => {
                                if (index < 60)
                                    return (
                                        <UserDesktop
                                            key={index}
                                            userId={user.userId}
                                            username={user.username}
                                            avatarUrl={user.avatarUrl}
                                            followerCount={user.followerCount}
                                        />
                                    );
                            })}
                        </div>
                    }
                    <div className="react-loading">
                        {isLoading === true ? <ReactLoading  type="spinningBubbles" color="#622DF7"/> : <div/>}
                    </div>
                </div>
            </StyledUsersDesktop>
        </div>
    );
};

export default UsersDesktop;