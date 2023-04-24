// Styles
import GlobalStyles from "./assets/styles/Global";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./assets/styles/Theme";
import {Provider} from 'react-redux';

// React
import { useEffect, useState } from "react";
import {Route,Switch, BrowserRouter} from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Header from "./components/Header/Header";

// Views
import Home from "./views/Home";
import Browse from "./views/Browse/Browse";
import Following from "./views/Following/Following";
import PageAllCategories from "./views/Browse/PageAllCategories";
import PageAllLive from "./views/Browse/PageAllLive";
import PageOverview from "./views/Following/PageOverview";
import PageLive from "./views/Following/PageLive";
import PageVideos from "./views/Following/PageVideos";
import PageCategories from "./views/Following/PageCategories";
import StreamView from "./views/StreamView/StreamView";
import store from "./store";

const App = () => {
  const { darkStatus, sideBarStatus } = useSelector((state) => state.site);
  const [mySize, setMySize] = useState(window.innerWidth);

  const [showModal, setShowModal] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [streamTitle, setStreamTitle] = useState('');

  return (
    <Provider store={store}>
      <ThemeProvider theme={darkStatus ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div className="app">
          <Header mySize={mySize} />
          <div
              className={`main ${
                  sideBarStatus && mySize > 1199 ? "sidebar-open" : ""
              }`}
          >
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/live/:username" component={StreamView}/>
                <Route path="/following/" component={Following}>
                  <Route index component={PageOverview} />
                  <Route path="live" component={PageLive} />
                  <Route path="videos" component={PageVideos} />
                  <Route path="categories" component={PageCategories} />
                </Route>
                <Route path="/browse/" component={Browse}>
                  <Route index component={PageAllCategories} />
                  <Route path="all" component={PageAllLive} />
                </Route>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
