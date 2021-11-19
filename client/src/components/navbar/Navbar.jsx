import React from "react";
import { Link } from "react-router-dom";
import insLogo from "../../images/instagram.png";
import NavMenu from "./NavMenu";
import NavSearch from "./NavSearch";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav__container">
        <div className="nav__logo">
            <Link to="/" className="nav__logo__link">
                <img src={insLogo} alt="Instagram" />
            </Link>
        </div>

        <div className="nav__search">
            <NavSearch />
        </div>

        <div className="nav__menu">
            <NavMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
