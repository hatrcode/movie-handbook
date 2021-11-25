import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";

const data = [
  {
    id: 1,
    url: "https://www.facebook.com/expatolife",
    icon: <FaFacebook className="social-icon"></FaFacebook>,
  },
  {
    id: 2,
    url: "https://www.twitter.com/expatolife",
    icon: <FaTwitter className="social-icon"></FaTwitter>,
  },
  {
    id: 3,
    url: "https://www.instagram.com/expatolife",
    icon: <FaInstagram className="social-icon"></FaInstagram>,
  },
  {
    id: 4,
    url: "https://www.pinterest.com/expatolife",
    icon: <FaPinterest className="social-icon"></FaPinterest>,
  },
];
const links = data.map((link) => {
  return (
    <li key={link.id}>
      <a href={link.url} className="social-link">
        {link.icon}
      </a>
    </li>
  );
});

export default ({ styleClass }) => {
  return (
    <ul className={`social-links ${styleClass ? styleClass : ""}`}>{links}</ul>
  );
};
