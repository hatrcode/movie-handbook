import React from "react";
import { Link } from "gatsby";

const SubNavDrop = ({ main, sub, url }) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">
        <Link to={url}>{main}</Link>
      </button>
      <div className="dropdown-content">
        {sub &&
          sub.map((c) => {
            return (
              <Link key={c.id} to={c.url}>
                {c.text}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SubNavDrop;
