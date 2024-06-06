import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(false);
  };
  return (
    <nav>
      <div className="logo-title">
        <img src="src/assets/logo.png" alt="" className="logo" />
        <Link to="/" className="site-title">
          HypatiaAI
        </Link>
      </div>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li onClick={handleMenuClick}>
          <NavLink to="/">Create</NavLink>
        </li>
        <li onClick={handleMenuClick}>
          <NavLink to="/contest">Contest</NavLink>
        </li>
        <li onClick={handleMenuClick}>
          <NavLink to="/submission">Submission</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
