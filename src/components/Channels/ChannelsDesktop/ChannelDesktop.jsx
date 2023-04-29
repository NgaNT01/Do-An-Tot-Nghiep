import { StyledChannelDesktop } from "./ChannelDesktop.styled";

import { FaEllipsisV } from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {cleanUsersStreamList} from "../../../store/user";

const ChannelDesktop = ({ user, imageId, video }) => {
    const dispatch = useDispatch();
    const onCleanListUser = () => {
        dispatch(cleanUsersStreamList());
    }

  return (
    <StyledChannelDesktop>
      <NavLink to={`/live/${user.username}`} onClick={onCleanListUser}>
      <div className="channel-box">
        <div className="live-screen">

            <img src="../../../../public/images/games/game-elder.jpg" alt="" />
            <div className={`live ${video ? "invisible" : ""}`}>trực tiếp</div>
            <div className={`viewers ${video ? "invisible" : ""}`}>
                {user.viewerCount} người xem
            </div>
            <div className={`video ${video ? "video-visible" : ""}`}>
              <div className="video-tag top">11:44</div>
              <div className="video-tag bottom-right">4 hours ago</div>
              <div className="video-tag bottom">188 lượt xem</div>
            </div>
        </div>
        <div className="channel-info">
          <div className="left">
            <div className="pp">
              <img src={`https://i.pravatar.cc/5${imageId}`} alt="" />
            </div>
            <div className="profile-info">
              <div className="title">{user.title}</div>
              <div className="username">{user.username}</div>
              <div className="game">{user.game}</div>
              <div className="tags">
                <div className="tag">English</div>
                <div className="tag">Esports</div>
              </div>
            </div>
          </div>
          <div className="right">
            <FaEllipsisV />
          </div>
        </div>
      </div>
     </NavLink>
    </StyledChannelDesktop>
  );
};

export default ChannelDesktop;
