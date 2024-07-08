import { useLocation } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Schedual from "./Schedual";
const Layout = ({ children }) => {
  const location = useLocation();
  if (location.pathname === "/") {
    return (
      <div>
        <main>{children}</main>
      </div>
    );
  }
  return (
    <div>
      <Schedual />
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
