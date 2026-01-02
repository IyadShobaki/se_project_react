import { useState } from "react";

import "./Header.css";
import logo from "../../assets/images/logo.svg";
import avatarDefault from "../../assets/images/avatarDefault.png";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const username = "Terrence Tegegne";
  const avatar = avatarDefault;

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <div className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <button className="header__toggler-btn" onClick={toggleNav}>
        {isNavOpen ? "\u2715" : "\u2550"}
      </button>
      <div
        className={`header__toggler ${
          isNavOpen ? "header__toggler_is-active" : ""
        }`}
      >
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">{username}</p>
          {avatar ? (
            <img
              src={avatar || avatarDefault}
              alt="user avatar"
              className="header__avatar"
            />
          ) : (
            <span className="header__avatar header__avatar_none">
              {username?.toUpperCase().charAt(0) || ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
