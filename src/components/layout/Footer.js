import React from "react";
import SocialLinks from "../../constants/socialLinks";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        <SocialLinks styleClass="footer-links"></SocialLinks>
        <p>
          &copy;{new Date().getFullYear()} Movie Handbook. Made by
          <span>
            <a href="https://www.hatruong.dev/"> Ha Truong</a>{" "}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
