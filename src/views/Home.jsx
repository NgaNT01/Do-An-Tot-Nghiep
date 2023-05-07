import { StyledHome } from "./Home.styled";

//React icons
import {
  IoGameControllerOutline,
  IoMusicalNotesOutline,
  IoTrophyOutline,
  IoMicOutline,
} from "react-icons/io5";

// Desktop Components
import ChannelsDesktop from "../components/Channels/ChannelsDesktop/ChannelsDesktop";
import CategoriesDesktop from "../components/Categories/CategoriesDesktop/CategoriesDekstop";
import Tags from "../components/Share/Tags";
import ShowMore from "../components/Share/ShowMore";
import Header from "../components/Header/Header";
import {useEffect} from "react";
import {cleanUsersStreamList, getListUsersStreaming} from "../store/user";
import {useDispatch, useSelector} from "react-redux";
import {BiChevronDown} from "react-icons/bi";

const Home = () => {
  const dispatch = useDispatch();
  const { currentListUser } = useSelector((state) => state.user);

  useEffect( () => {dispatch(cleanUsersStreamList());
    dispatch(getListUsersStreaming());

    return () => {

    }
  },[])

  return (
    <>
      <Header mySize="1848" />
      <StyledHome>
        <div className="home-desktop">
          <div className="home-box">
            <ChannelsDesktop channelTitle="Các luồng trực tiếp mới nhất" />
            {/*{currentListUser.length >= 5 ? <ShowMore title="Show more" /> : null}*/}
            <ShowMore title="Show more" />
            <CategoriesDesktop
              title="có thể bạn sẽ thích"
              boldTitle="Danh mục"
            />
            <ShowMore />
            {/*<Tags />*/}
          </div>
        </div>
      </StyledHome>
    </>
  );
};

export default Home;
