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
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../../store/user";
import {getCurrentUser} from "../../../utils/auth";

const ProfileDesktop = () => {
  const [profileStatus, setProfileStatus] = useState(false);
  const {darkStatus} = useSelector(state => state.site);

  const history = useHistory();
  const dispatch = useDispatch();


  const handleLogOut = () => {
    localStorage.removeItem('access_token');
    dispatch(signOut());
    // Điều hướng về trang chu
    history.push('/');
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
                  <Link to={`/auth/user-profile/${getCurrentUser().username}`}>
                    <div className="item" style={darkStatus ? {color: '#fff'} : {color: '#000'}}>
                      <FiUserMinus /> <span>Thông tin cá nhân</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to>
                  <div className="item" style={darkStatus ? {color: '#fff'} : {color: '#000'}}>
                    <VscSettings /> <span>Quản lý phát trực tiếp</span>
                  </div>
                  </Link>
                </li>
                <li>
                  <Link to>
                  <div className="item" style={darkStatus ? {color: '#fff'} : {color: '#000'}}>
                    <MdOutlineDarkMode /> <span>Giao diện tối</span>
                  </div>
                  </Link>
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
