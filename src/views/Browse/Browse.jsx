import { StyledBrowse } from "./Browse.styled";

// React
import { useSelector } from "react-redux";
import { useState } from "react";

// Mobile Components
import BigChannel from "../../components/Channels/ChannelsMobile/BigChannel";
import BigCategories from "../../components/Categories/CategoriesMobile/BigCategories";

// Desktop Components
import Tags from "../../components/Share/Tags";
import MyLink from "../../components/Share/LinkItem";
import Search from "../../components/Share/Search";

// React icons
import { BiChevronDown } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import PageAllCategories from "./PageAllCategories";

const Browse = () => {
  const [categoriesButton, setCategoriesButton] = useState(true);
  const { users } = useSelector((state) => state.user);

  return (
    <>
      <StyledBrowse>
        <div className="browse-mobile">
          <div className="browse-box">
            <h1>Duyệt</h1>
            <div className="navigation">
              <div
                onClick={() => setCategoriesButton(true)}
                className={`nav-categories ${
                  categoriesButton ? "nav-active" : ""
                }`}
              >
                Danh mục
              </div>
              <div
                onClick={() => setCategoriesButton(false)}
                className={`nav-liveChannels ${
                  !categoriesButton ? "nav-active" : ""
                }`}
              >
                Kênh trực tiếp
              </div>
            </div>
            {categoriesButton ? (
              <div className="categories">
                <BigCategories />
              </div>
            ) : (
              <div className="live-channels">
                {users.map((user, index) => {
                  return <BigChannel user={user} key={index} imageId={index} />;
                })}
              </div>
            )}
          </div>
        </div>
        <div className="browse-desktop">
          <div className="browse-box">
            <h1 className="page-title">Duyệt</h1>
            <Tags />

            <div className="nav">
              <ul>
                <li>
                  <MyLink to="/browse" title="Danh mục" />
                </li>
                <li>
                  <MyLink to="/browse/all" title="Kênh trực tiếp" />
                </li>
              </ul>
            </div>
            <div className="search-filter">
              <div className="search-box">
                <span>Lọc theo</span>
                <Search placeholder="Tìm kiếm thẻ" />
              </div>
              <div className="filter">
                <span style={{fontSize: '15px', width: '100px'}}>Sắp xếp theo</span>
                <div className="sort" style={{fontSize: '15px', width: '160px'}}>
                  Đề xuất cho bạn
                  <div className="sort-icon">
                    <BiChevronDown />
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </StyledBrowse>
    </>
  );
};

export default Browse;
