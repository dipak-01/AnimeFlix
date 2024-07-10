import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EarthoOneProvider } from "@eartho/one-client-react";

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
function App() {
  return (
    <>
      <Router>
        <div>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<HomePage />} />

              <Route path="/watch/:id" element={<AnimeStream />} />
              <Route path="/community" element={<Community />} />
              <Route path="/watchtogether" element={<WatchTogether />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/user/watchlist" element={<WatchList />} />
              <Route
                path="/user/continuewatching"
                element={<ContinueWatch />}
              />
              <Route path="/community/thread/:id" element={<Thread/>}/>
              <Route path="/search" element={<SearchPage />} />

              <Route path="/anime/info" element={<AnimeInfo />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </>
  );
}

export default App;
