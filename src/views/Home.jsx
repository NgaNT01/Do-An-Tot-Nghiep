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
import React, {useEffect} from "react";
import {cleanUsersStreamList, getListUsersStreaming} from "../store/user";
import {useDispatch, useSelector} from "react-redux";
import {BiChevronDown} from "react-icons/bi";
import {getListCategories} from "../store/category";
import {getListBroadcastingStreams} from "../store/streams";
import Seperate from "../components/Share/Seperate";
import ReactLoading from "react-loading";

const Home = () => {
  const dispatch = useDispatch();
  const { currentListUser } = useSelector((state) => state.user);
  const { currentListCategories } = useSelector((state) => state.category);
  const {currentBroadcastingStreams} = useSelector(state => state.stream)

  useEffect(  () => {dispatch(cleanUsersStreamList());
    // dispatch(getListUsersStreaming());
    handleDispatchAction(getListBroadcastingStreams());
    return () => {

    }
  },[])

  // useEffect(() => {
  //   handleDispatchAction(getListBroadcastingStreams());
  // } , [currentBroadcastingStreams])

  const handleDispatchAction = async (action) => {
    await dispatch(action);
  }

  return (
    <>
      <Header title="Trang chủ" mySize="1848" />
      <StyledHome>
        <div className="home-desktop">
          <div className="home-box">
            <ChannelsDesktop currentBroadcastingStreams={currentBroadcastingStreams} channelTitle="Các live stream mới nhất" />
            {currentBroadcastingStreams.length >= 5 ? <ShowMore title="Show more" /> : <Seperate/>}
            <ChannelsDesktop currentBroadcastingStreams={currentBroadcastingStreams} channelTitle="Top 10 live stream có nhiều lượt xem nhất" />
            {currentBroadcastingStreams.length >= 5 ? <ShowMore title="Show more" /> : <Seperate/>}
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
