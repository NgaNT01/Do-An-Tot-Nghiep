import { StyledFollowing } from "../Following/Following.styled";

import { useLocation} from "react-router-dom";


// Components
import MyLink from "../../components/Share/LinkItem";

const Following = () => {
  const { pathname } = useLocation();

  return (
    <>
      <StyledFollowing>
        <div className="follow-mobile">
          <div className="follow-box">
            <h1>Following</h1>
            <h3>Your Live Channels</h3>
            <Channels />
            <h3>Your Offline Channels</h3>
            <OfflineChannels />
          </div>
        </div>
        <div className="follow-desktop">
          <div className="follow-box">
            <h1 className="page-title">Đang theo dõi</h1>

            <div className="nav">
              <ul>
                <li>
                  <MyLink to="/following" title="Tổng quan" />
                </li>
                <li>
                  <MyLink to="/following/live" title="Trực tiếp" />
                </li>
                <li>
                  <MyLink to="/following/videos" title="Videos" />
                </li>
                <li>
                  <MyLink to="/following/categories" title="Danh mục" />
                </li>
              </ul>
            </div>
            <div className="page">
            </div>
          </div>
        </div>
      </StyledFollowing>
    </>
  );
};

export default Following;
