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
    label: "Facebook",
    icon: <FaFacebook className="social-icon" />,
  },
  {
    id: 2,
    url: "https://www.twitter.com/expatolife",
    label: "Twitter",
    icon: <FaTwitter className="social-icon" />,
  },
  {
    id: 3,
    url: "https://www.instagram.com/expatolife",
    label: "Instagram",
    icon: <FaInstagram className="social-icon" />,
  },
  {
    id: 4,
    url: "https://www.pinterest.com/expatolife",
    label: "Pinterest",
    icon: <FaPinterest className="social-icon" />,
  },
];

export default function SocialLinks({ styleClass }: { styleClass?: string }) {
  return (
    <ul className={`social-links ${styleClass ? styleClass : ""}`}>
      {data.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            className="social-link"
            aria-label={`Movie Handbook on ${link.label}`}
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
