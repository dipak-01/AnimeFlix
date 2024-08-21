import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./components/Layout";
import Profile from "./pages/Profile.jsx";
import Thread from "./pages/Thread.jsx";
import WatchList from "./pages/WatchList.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import AnimeInfo from "./pages/AnimeInfo.jsx";
import Community from "./pages/Community.jsx";
import WatchTogether from "./pages/WatchTogether.jsx";
import AnimeStream from "./pages/AnimeStream.jsx";
import Login from "./pages/Login.jsx";
import { ContinueWatch } from "./pages/ContinueWatch.jsx";
import { AlertProvider } from "./components/AlertContext.jsx";
import AlertComponent from "./components/Alerts.jsx";
import CategoryPages from "./pages/CategoryPages.jsx";
import WatchTogetherAnime from "./pages/WatchTogetherAnime.jsx";
import Register from "./pages/Register.jsx";
function App() {
  return (
    <>
      <AlertProvider>
        <Provider store={store}>
          <AlertComponent />
          <Router>
            <div>
              <Layout>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/home" element={<HomePage />} />

                  <Route path="/watch/:id" element={<AnimeStream />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/watchtogether/create/:id" element={<WatchTogether />} />
                  <Route path="/watchtogether/:id" element={<WatchTogetherAnime />} />
                  <Route path="/user/profile" element={<Profile />} />
                  <Route path="/user/watchlist" element={<WatchList />} />
                  <Route
                    path="/anime/mostpopular"
                    element={<CategoryPages />}
                  />
                  <Route path="/anime/topairing" element={<CategoryPages />} />
                  <Route
                    path="/anime/mostfavourite"
                    element={<CategoryPages />}
                  />
                  <Route
                    path="/anime/latestcompleted"
                    element={<CategoryPages />}
                  />
                  <Route
                    path="/user/continuewatching"
                    element={<ContinueWatch />}
                  />
                  <Route path="/community/thread/:id" element={<Thread />} />
                  <Route path="/search" element={<SearchPage />} />

                  <Route path="/anime/info" element={<AnimeInfo />} />
                </Routes>
              </Layout>
            </div>
          </Router>
        </Provider>
      </AlertProvider>
    </>
  );
}

export default App;
