import { StyledChannelsDesktop } from "./ChannelDesktop.styled";

import {useDispatch, useSelector} from "react-redux";

import ChannelDesktop from "./ChannelDesktop";
import {useEffect} from "react";
import {getUserById} from "../../../store/user";

const ChannelsDesktop = ({ channelTitle, video, currentBroadcastingStreams }) => {
  const { currentListUser } = useSelector((state) => state.user);
  // const {currentBroadcastingStreams} = useSelector(state => state.stream);
  const dispatch = useDispatch();

  useEffect(() => {
  },[])

  return (
    <StyledChannelsDesktop>

            <div className="channels-box">
                {channelTitle && <h1>{channelTitle}</h1>}
                {currentBroadcastingStreams.length === 0 ? <div style={{marginTop: '20px',marginLeft: '20px',fontSize: '20px'}}>Hiện chưa có livestream nào đươc phát</div> :
                <div className="list">
                    {currentBroadcastingStreams.map((stream, index) => {
                        if (index < 6)
                            return (
                                <ChannelDesktop
                                    stream={stream}
                                    key={index}
                                    imageId={index}
                                    video={video}
                                />
                            );
                    })}
                </div>
                }
            </div>
    </StyledChannelsDesktop>
  );
};

export default ChannelsDesktop;
