import React from "react";
import PropTypes from "prop-types";
import "../../css/main.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <BottomNav />
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
