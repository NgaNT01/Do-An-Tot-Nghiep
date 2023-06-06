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
import {getListCategories} from "../store/category";
import {getListBroadcastingStreams} from "../store/streams";

const Home = () => {
  const dispatch = useDispatch();
  const { currentListUser } = useSelector((state) => state.user);
  const { currentListCategories } = useSelector((state) => state.category);
  const {currentBroadcastingStreams} = useSelector(state => state.stream)

  useEffect( () => {dispatch(cleanUsersStreamList());
    // dispatch(getListUsersStreaming());
    dispatch(getListBroadcastingStreams());
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
            <ChannelsDesktop channelTitle="Top 10 luồng trực tiếp có nhiều lượt xem nhất" />
            <ShowMore title="Show more" />
            <CategoriesDesktop
              title="Chọn danh mục bạn thích"
              boldTitle=""
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
