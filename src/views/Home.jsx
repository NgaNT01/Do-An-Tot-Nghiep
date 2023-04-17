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

const Home = () => {
  return (
    <>
      <StyledHome>
        <div className="home-desktop">
          <div className="home-box">
            <ChannelsDesktop channelTitle="Kênh trực tiếp có thể bạn sẽ thích" />
            <ShowMore title="Show more" />
            <CategoriesDesktop
              title="có thể bạn sẽ thích"
              boldTitle="Danh mục"
            />
            <ShowMore />
            <Tags />
          </div>
        </div>
      </StyledHome>
    </>
  );
};

export default Home;
