// Styled
import { StyledProfileDesktop } from "./ProfileDesktop.styled";

// React
import { useState } from "react";

// React İcons
import { FaCircle } from "react-icons/fa";
import { FiUsers, FiUserMinus, FiShield, FiTwitch } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import { BiUser, BiWallet } from "react-icons/bi";
import { BsInbox, BsFileBarGraph } from "react-icons/bs";
import { MdOutlineDarkMode, MdLanguage, MdOutlineLogout } from "react-icons/md";
import { RiSettings2Line, RiArrowRightSLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";

// Components
import DarkAndStatus from "./DarkAndStatus";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../../store/user";
import {getCurrentUser} from "../../../utils/auth";

const ProfileDesktop = () => {
  const [profileStatus, setProfileStatus] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const changeStatus = () => {
    return setOnlineStatus(!onlineStatus);
  };

  const handleLogOut = () => {
    localStorage.removeItem('access_token');
    dispatch(signOut());
    // Điều hướng về trang chu
    history.push('/');
  }

  const handleMoveToDetailProfile = () => {

  }

  return (
    <StyledProfileDesktop>
      <div className="profile-box">
        <div
          className="profile"
          onClick={() => setProfileStatus(!profileStatus)}
        >
          <BiUser />
        </div>
        <div
          className={`profile-menu ${profileStatus ? "show-profile-menu" : ""}`}
        >
          <div className="menu-box">
            <div className="profile-info">
              <div className="pp">
                <BiUser />
              </div>
              <div className="info">
                <div className="username">{getCurrentUser().username}</div>
                <div className="status">
                </div>
              </div>
            </div>
            <hr />
            <div className="menu-list">
              <ul>
                <li>
                  <div className="item" onClick={handleMoveToDetailProfile}>
                    <FiUserMinus /> <span>Thông tin cá nhân</span>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <VscSettings /> <span>Tạo Stream</span>
                  </div>
                </li>
                <li>
                  <div className="item">
                    <MdOutlineDarkMode /> <span>Giao diện tối</span>
                  </div>
                  <DarkAndStatus whichStatus="darkmode" />
                </li>
                <hr />
                <li>
                  <div className="item" onClick={handleLogOut}>
                    <MdOutlineLogout style={{ transform: "rotate(180deg)" }} />{" "}
                    <span>Đăng xuất</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StyledProfileDesktop>
  );
};

export default ProfileDesktop;
