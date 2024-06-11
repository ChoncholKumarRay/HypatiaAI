import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logoIcon from "../../assets/logo.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(false);
  };
  return (
    <nav>
      <div className="logo-title">
        <img src={logoIcon} alt="" className="logo" />
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
          <NavLink to="/about">About</NavLink>
        </li>
        <li onClick={handleMenuClick}>
          <NavLink to="/cam">CAM-SUST</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
