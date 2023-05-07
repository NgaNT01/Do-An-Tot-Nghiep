import { StyledHeaderDesktop } from "./HeaderDesktop.styled";

//React
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// React icons
import { BsTwitch, BsSuitDiamondFill } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { BiSearch, BiMessageAlt, BiArchive } from "react-icons/bi";
import { CgCrown } from "react-icons/cg";

// Components
import ProfileDesktop from "./ProfileDesktop";
import SideBar from "./SideBar";
import {useSelector} from "react-redux";
import {Button} from "antd";
import {getCurrentUser, getToken} from "../../../utils/auth";

const HeaderDesktop = ({ mySize }) => {
  const { pathname } = useLocation();
  const {isLoggedIn} = useSelector(state => state.user);

  return (
    <StyledHeaderDesktop>
      <>
        <div className="header-box">
          <header>
            {/*<div className="left">*/}
            {/*  <ul>*/}
            {/*    <li>*/}
            {/*      <div className="item">*/}
            {/*        <Link to="/">*/}
            {/*          <div className="logo">*/}
            {/*            <div className="logo-bg" />*/}
            {/*            <BsTwitch />*/}
            {/*          </div>*/}
            {/*        </Link>*/}
            {/*      </div>*/}
            {/*    </li>*/}
            {/*    <li className={pathname.includes("following") ? "active" : ""}>*/}
            {/*      <Link to="/following" className="link">*/}
            {/*        <div className="item" style={{width: '150px'}}>Đang theo dõi</div>*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*    <li className={pathname.includes("browse") ? "active" : ""}>*/}
            {/*      <Link to="/browse" className="link" >*/}
            {/*        <div className="item">Duyệt</div>*/}
            {/*      </Link>*/}
            {/*    </li>*/}
            {/*    /!*<li>*!/*/}
            {/*    /!*  <div className="item">*!/*/}
            {/*    /!*    <FaEllipsisV className="item-icon" />*!/*/}
            {/*    /!*  </div>*!/*/}
            {/*    /!*</li>*!/*/}
            {/*  </ul>*/}
            {/*</div>*/}
            <div className="bottom">
              <div className="search-bar">
                <input type="text" placeholder="Tìm kiếm" />
                <div className="search-icon">
                  <BiSearch />
                </div>
              </div>
            </div>
            <div className="right">
              <div className="right-icons">
                <ul>
                </ul>
              </div>
            </div>
            {(getCurrentUser() !== null && getToken() !== "") ?
                <div className="profile-desktop">
                  <ProfileDesktop />
                </div> :
                <div className="auth-button">
                  <Link to="/auth/sign-up">
                    <Button style={{marginRight: '20px'}} size="large">Đăng ký</Button>
                  </Link>
                  <Link to="/auth/sign-in">
                    <Button style={{marginRight: '20px'}} size="large" type="primary">Đăng nhập</Button>
                  </Link>
                </div>
            }
          </header>
        </div>
        {/*<div className="left-bar">*/}
        {/*  <SideBar mySize={mySize} />*/}
        {/*</div>*/}
      </>
    </StyledHeaderDesktop>
  );
};

export default HeaderDesktop;
