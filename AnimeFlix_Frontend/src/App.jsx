 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import LandingPage from "./pages/LandingPage.jsx";
import HomePage from "./pages/HomePage.jsx";
 import Layout from './components/Layout';
import SearchPage from "./pages/SearchPage.jsx";
import AnimeInfo from "./pages/AnimeInfo.jsx";
import Community from "./pages/Community.jsx";
import WatchTogether from "./pages/WatchTogether.jsx";
import AnimeStream from "./pages/AnimeStream.jsx";
function App() {
 
  return (
    <>
      <Router>  
      <div>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/watch/:id" element={<AnimeStream />} />
            <Route path="/community" element={<Community />} />
            <Route path="/watchtogether" element={<WatchTogether />} />
         
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
