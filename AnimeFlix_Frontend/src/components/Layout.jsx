import { useLocation } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Schedual from "./Schedual";
const Layout = ({ children }) => {
  const location = useLocation();
  if (location.pathname === "/") {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col">
      <Schedual />
      <nav>
        <Navbar />
      </nav>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
